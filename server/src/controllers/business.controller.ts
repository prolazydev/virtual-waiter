import mongoose, { type FilterQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { respond } from '../utils/common/http';
import { type Business } from '../db/models/Business/Business';
import { Message } from '../utils/common/ServerResponseMessages';
import { requestHandler } from '../utils/errors/asyncErrorHandler';
import { handleError } from '../utils/errors/error';
import { createBusiness, findBusinesses, findBusinessById, findBusinessesByUserId, findBusinessesByName, findBusinessesByCustomQuery, findBusinessesByAggregate, findAndUpdateBusinessById, deleteBusinessesByUserId, deleteBusinessById, findBusinessByCustomQuery } from '../services/CRUD/business.service';
import { generateRandom4DigitNumber } from '../utils/crypto';
import { sendEmail } from '../utils/email';

export const registerBusinessRequest = requestHandler<Business>(async (req, res) => {
	try {
		const business = req.body;
		if ( !business ) 
			return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

		const newBusiness = await createBusiness(business);
		
		respond(res, StatusCodes.CREATED, Message.SuccessCreate, { id: newBusiness._id });
	} catch (error) {
		handleError(res, error);
	}
});

// #region GET 
export const getAllBusinesses = requestHandler(async (req, res) => {
	try {
		const businesses = await findBusinesses();
		respond(res, StatusCodes.OK, Message.SuccessRead, businesses);
	} catch (error) {
		handleError(res, error);
	}
});

export const getBusinessById = requestHandler(async (req, res) => {
	try {
		const id = req.params.id;
		if ( !id ) 
			return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		if ( id.length !== 24 )
			return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

		// TODO: get business with the ratings also
		const business = (await findBusinessesByAggregate([
			{
				$lookup: {
					from: 'business_reviews',
					localField: '_id',
					foreignField: 'businessId',
					as: 'userReviews',
				},
			},
			{
				$lookup: {
					from: 'products',
					localField: '_id',
					foreignField: 'businessId',
					as: 'businessProducts',
				}
			}
		]))[0];

		if ( !business ) 
			return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		
		business.averageRating = parseFloat(business.averageRating!.toFixed(2));

		respond(res, StatusCodes.OK, Message.SuccessRead, business);
	} catch (error) {
		console.log(error);
		handleError(res, error);
	}
});

export const getBusinessesByUserId = requestHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const businesses = await findBusinessesByUserId(id);
	if ( !businesses ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessRead, businesses);
});

export const getBusinessesByName = requestHandler(async (req, res) => {
	const name = req.params.name;
	if ( !name ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const businesses = await findBusinessesByName(name);
	if ( !businesses ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessRead, businesses);
});

export const getBusinessesSelf = requestHandler(async (req, res) => {
	const userId = req.identity!.id;
	if ( !userId ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const businesses = await findBusinessesByUserId(userId);
	if ( !businesses ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessRead, businesses);
});

export const getBusinessesByCustomQuery = requestHandler<FilterQuery<Business>>(async (req, res) => {
	const filter = req.body;
	if ( !filter ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const businesses = await findBusinessesByCustomQuery(filter);
	if ( !businesses ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessRead, businesses);
});
// #endregion

export const getBusinessConfirmationCode = requestHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const business = await findBusinessById(id);
	if ( !business ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	if ( business.userId.toString() !== req.identity!.id )
		return respond(res, StatusCodes.FORBIDDEN, Message.NotAuthorized);

	if ( business.confirmed ) 
		return respond(res, StatusCodes.CONFLICT, Message.BusinessAlreadyConfirmed);

	business.confirmationCode = generateRandom4DigitNumber();
	business.confirmationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

	// SEND EMAIL
	const message = `Hi there! Your confirmation code is: ${business.confirmationCode}\n\r\n\rThis code will expire in 10 minutes.`;
	try {
		await Promise.all([
			business.save({ validateBeforeSave: false }),
			sendEmail({
				email: business.email,
				subject: 'Business Confirmation Code',
				message
			})
		]);
		respond(res, StatusCodes.OK, Message.SuccessRead);
	} catch (error) {
		business.confirmationCode = undefined;
		business.confirmationCodeExpiry = undefined;
		await business.save({ validateBeforeSave: false });

		respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.EmailPasswordResetError);
	}
});

// #region PATCH 
export const updateBusinessById = requestHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const business = req.body;
	if ( !business ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const updatedBusiness = await findAndUpdateBusinessById(id, business);
	if ( !updatedBusiness ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessUpdate, updatedBusiness);
});
// #endregion

export const confirmBusinessAccount = requestHandler(async (req, res) => {
	const { id, code } = req.params;
	if ( !id || !code ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const business = await findBusinessByCustomQuery({ 
		_id: id, 
		confirmationCode: code,
		confirmationCodeExpiry: { $gt: new Date() }
	});
	if ( !business ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	if ( business.userId.toString() !== req.identity!.id )
		return respond(res, StatusCodes.FORBIDDEN, Message.NotAuthorized);

	if ( business.confirmed ) 
		return respond(res, StatusCodes.CONFLICT, Message.BusinessAlreadyConfirmed);	

	business.confirmationCode = undefined;
	business.confirmationCodeExpiry = undefined;
	business.confirmed = true;

	const message = 'Welcome! Your account has been confirmed!';
	try {
		await Promise.all([
			business.save({ validateBeforeSave: false }),
			sendEmail({
				email: business.email,
				subject: 'Business Confirmation Code',
				message
			})
		]);
		respond(res, StatusCodes.OK, Message.SuccessUpdate);
	} catch (error) {
		console.log(error);

		business.confirmationCode = undefined;
		business.confirmationCodeExpiry = undefined;
		business.confirmed = false;
		await business.save({ validateBeforeSave: false });

		respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.EmailPasswordResetError);
	}
});

// #region DELETE 
export const deleteBusiness = requestHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const deletedBusiness = await deleteBusinessById(id);
	if ( !deletedBusiness ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessDelete, deletedBusiness);
});

export const deleteUserBusinessesTransaction = requestHandler(async (req, res) => {
	const session = await mongoose.startSession();
	try {
		const userId = req.params.id;
		if ( !userId ) 
			return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

		session.startTransaction();
		await deleteBusinessesByUserId(userId);
		await session.commitTransaction();

		respond(res, StatusCodes.OK, Message.SuccessDelete);
	} catch (error) {
		console.log('Error in transaction');
		console.log(error);
		await session.abortTransaction();
		respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.ErrorDelete);
	} finally {
		await session.endSession();
	}
});

// #endregion