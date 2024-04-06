import { StatusCodes } from 'http-status-codes';

import { respond } from '../utils/common/http';
import { Message } from '../utils/common/ServerResponseMessages';
import { requestHandler } from '../utils/errors/asyncErrorHandler';
import { createBusinessCategory, findAllBusinessCategories, findBusinessCategoryById, findBusinessCategoriesByName, findBusinessCategoriesByCustomQuery, deleteBusinessCategoriesByUserId, findAndUpdateBusinessCategoryById, deleteBusinessCategoriesByUserIdTransaction } from '../services/CRUD/businessCategory.service';
import type { BusinessCategory } from '../db/models/BusinessCategory';
import { handleError } from '../utils/errors/error';
import mongoose from 'mongoose';

export const registerBusinessCategory = requestHandler<BusinessCategory>(async (req, res) => {
	try {
		const body = req.body;
		if ( !body ) 
			return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		
		const businessCategory = await createBusinessCategory(body);
		respond(res, StatusCodes.CREATED, Message.SuccessCreate, businessCategory);
	} catch (error) {
		handleError(res, error);
	}
});

export const getAllBusinessCategories = requestHandler(async (req, res) => {
	try {
		const businessCategories = await findAllBusinessCategories();
		respond(res, StatusCodes.OK, Message.SuccessRead, businessCategories);
	} catch (error) {
		handleError(res, error);
	}
});

export const getBusinessCategoryById = requestHandler(async (req, res) => {
	try {
		const id = req.params.id;
		if ( !id ) 
			return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		
		const businessCategory = await findBusinessCategoryById(id);
		if ( !businessCategory ) 
			return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		
		respond(res, StatusCodes.OK, Message.SuccessRead, businessCategory);
	} catch (error) {
		handleError(res, error);
	}
});

export const getBusinessCategoriesByName = requestHandler(async (req, res) => {
	const name = req.params.name;
	if ( !name ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
	
	const businessCategories = await findBusinessCategoriesByName(name);
	if ( !businessCategories ) 
		return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.DatabaseError);

	// businessCategories.sort((a, b) => a.name.localeCompare(b.name));
	
	respond(res, StatusCodes.OK, Message.SuccessRead, businessCategories);
});

export const getBusinessCategoriesByCustomQuery = requestHandler(async (req, res) => {
	const query = req.query;
	const businessCategories = await findBusinessCategoriesByCustomQuery(query);
	respond(res, StatusCodes.OK, Message.SuccessRead, businessCategories);
});

export const updateBusinessCategoryById = requestHandler(async (req, res) => {
	const id = req.params.id;
	const businessCategory = req.body;
	if ( !id || !businessCategory ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
	
	const updatedBusinessCategory = await findAndUpdateBusinessCategoryById(id, businessCategory);
	respond(res, StatusCodes.OK, Message.SuccessUpdate, updatedBusinessCategory);
});

export const deleteBusinessCategoryById = requestHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
	
	const deletedBusinessCategory = await deleteBusinessCategoriesByUserId(id);
	respond(res, StatusCodes.OK, Message.SuccessDelete, deletedBusinessCategory);
}	);

export const deleteUserBusinessCategoriesTransaction = requestHandler(async (req, res) => {
	const session = await mongoose.startSession();

	try {
		const userId = req.params.userId;
		if ( !userId ) 
			return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		
		const deletedBusinessCategories = await deleteBusinessCategoriesByUserIdTransaction(userId, session);
		respond(res, StatusCodes.OK, Message.SuccessDelete, deletedBusinessCategories);
	} catch (error) {
		console.log('Error in transaction');
		console.log(error);
		await session.abortTransaction();
		respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.ErrorDelete);
	} finally {
		await session.endSession();
	}
});
