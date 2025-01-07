import mongoose, { type FilterQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { type Business } from '@/db/models/Business/Business';

import { respond } from '@/utils/common/http';
import { Message } from '@/utils/common/ServerResponseMessages';
import { requestHandler } from '@/utils/common/asyncErrorHandler';
import { handleError } from '@/utils/errors/error';
import { generateRandom4DigitNumber } from '@/utils/crypto';
import { sendEmail } from '@/utils/email';

import { createBusiness, findAllBusinesses, findBusinessById, findBusinessesByUserId, findBusinessByName, findBusinessesByCustomQuery, findAndUpdateBusinessById, deleteBusinessesByUserId, deleteBusinessById, findBusinessByCustomQuery, findAndUpdateBusinessContactById, findAndAddBusinessContactById, deleteBusinessContactByBusinessId } from '@/services/CRUD/business.service';
import type { MyRequest } from '@/types';

// #region POST
export const registerBusinessRequest = requestHandler<Business>(async (req, res) => {
	const business = req.body;
	if (!business)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	// business.username = 'contosso2';

	const newBusiness = await createBusiness(business);

	respond(res, StatusCodes.CREATED, Message.SuccessCreate, { id: newBusiness._id });
});

export const getBusinessConfirmationCode = requestHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id )
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const business = await findBusinessById(id);
	if (!business)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	if (business.userId.toString() !== req.identity!.id)
		return respond(res, StatusCodes.FORBIDDEN, Message.NotAuthorized);

	if (business.confirmed)
		return respond(res, StatusCodes.CONFLICT, Message.BusinessAlreadyConfirmed);

	business.confirmationCode = generateRandom4DigitNumber();
	business.confirmationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

	// SEND EMAIL
	const message = `Hi there! Your confirmation code is: ${ business.confirmationCode }\n\r\n\rThis code will expire in 10 minutes.`;
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
// #endregion

// #region GET 
export const getAllBusinesses = requestHandler(async (req, res) => {
	try {
		const businesses = await findAllBusinesses();
		respond(res, StatusCodes.OK, Message.SuccessRead, businesses);
	} catch (error) {
		handleError(res, error);
	}
});

export const getBusinessById = requestHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id || id.length !== 24 )
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	// check if it has any query params to specifically select only the mentioned fields
	const selectFields = getSelectedFields(req.query.fields as string);

	const business = await findBusinessById(id).select(selectFields).lean();
	if ( !business ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessRead, business);
});

// TODO: Implement this
export const getBusinessByIdWithProductsAndReviews = requestHandler(async (req, res) => {
	// const business = (await findBusinessesByAggregate([
	// 	{ $match: { _id: new Types.ObjectId(id) } },
	// 	{
	// 		$lookup: {
	// 			from: 'business_reviews',
	// 			localField: '_id',
	// 			foreignField: 'businessId',
	// 			as: 'userReviews',
	// 		},
	// 	},
	// 	{
	// 		$lookup: {
	// 			from: 'products',
	// 			localField: '_id',
	// 			foreignField: 'businessId',
	// 			as: 'businessProducts',
	// 		}
	// 	}
	// ]))[0];
});

export const getBusinessByName = requestHandler(async (req, res) => {
	const name = req.params.name;
	if (!name)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const businesses = await findBusinessByName(name);

	if (!businesses)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessRead, businesses);
});

export const getBusinessesByUserId = requestHandler(async (req, res) => {
	const id = req.params.id;
	if (!id)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const businesses = await findBusinessesByUserId(id);
	if (!businesses)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessRead, businesses);
});

export const getAllOwnedBusinesses = requestHandler(async (req, res) => {
	const userId = req.identity!.id;
	if (!userId)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
	
	const selectFields = getSelectedFields(req.query.fields as string);

	const businesses = await findBusinessesByUserId(userId).select(selectFields).lean();
	console.log('businesses', businesses);
	if (!businesses)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessRead, businesses);
});

export const getBusinessesByCustomQuery = requestHandler<FilterQuery<Business>>(async (req, res) => {
	const filter = req.body;
	if (!filter)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const businesses = await findBusinessesByCustomQuery(filter);
	if (!businesses)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessRead, businesses);
});

// #endregion

// #region PATCH 

/**
 * Update business details, may update partialy or fully
 */
export const updateBusiness = requestHandler(async (req, res) => {
	try {
		const id = req.params.id;
		const business = req.body;

		if (!id || !business || Object.keys(business).length === 0)
			return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

		const updatedBusiness = await findAndUpdateBusinessById(id, business);
		if (!updatedBusiness)
			return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

		respond(res, StatusCodes.OK, Message.SuccessUpdate, updatedBusiness);
	} catch (error) {
		handleError(res, error);

	}
});

// #endregion

// #region PATCH Contact

export const updateBusinessContact = requestHandler<{ oldValue: string, value: string; }>(async (req, res) => {
	try {
		const id = req.params.id;
		const { oldValue, value } = req.body;

		if (!id || !value)
			return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

		const updatedBusiness = await findAndUpdateBusinessContactById(id, oldValue, value);
		if (!updatedBusiness)
			return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

		respond(res, StatusCodes.OK, Message.SuccessUpdate, updatedBusiness);
	} catch (error) {
		handleError(res, error);
	}
});

export const addBusinessContact = requestHandler<{ contactType: string, value: string; }>(async (req, res) => {
	const id = req.params.id;
	const { contactType, value } = req.body;

	if (!id || !value)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const updatedBusiness = await findAndAddBusinessContactById(id, { contactType, value });
	if (!updatedBusiness)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessUpdate, updatedBusiness);
});

export const deleteBusinessContact = requestHandler<{ contactType: string, value: string; }>(async (req, res) => {
	const id = req.params.id;
	const contact = req.body;

	if (!id || !contact)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const deletedBusiness = await deleteBusinessContactByBusinessId(id, contact);
	if (!deletedBusiness)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessDelete, deletedBusiness);
});

// #endregion

// #region DELETE 
export const deleteBusiness = requestHandler(async (req, res) => {
	const id = req.params.id;
	if (!id)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const deletedBusiness = await deleteBusinessById(id);
	if (!deletedBusiness)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessDelete, deletedBusiness);
});

export const deleteUserBusinessesTransaction = requestHandler(async (req, res) => {
	const session = await mongoose.startSession();
	try {
		const userId = req.params.id;
		if (!userId)
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

// #region Business Account Confirmation

export const confirmBusinessAccount = requestHandler(async (req, res) => {
	const { id, code } = req.params;
	if (!id || !code)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const business = await findBusinessByCustomQuery({
		_id: id,
		confirmationCode: code,
		confirmationCodeExpiry: { $gt: new Date() }
	});
	if (!business)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	if (business.userId.toString() !== req.identity!.id)
		return respond(res, StatusCodes.FORBIDDEN, Message.NotAuthorized);

	if (business.confirmed)
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
// #endregion

// Private
function getSelectedFields(fields: string) {
	return fields ? fields.split(',').join(' ') : '';
}