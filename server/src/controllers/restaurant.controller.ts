import mongoose, { FilterQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { respond } from '../utils/common/http';
import { Message } from '../utils/common/ServerResponseMessages';
import { requestHandler } from '../utils/errors/asyncErrorHandler';
import { Restaurant } from '../db/models/Restaurant';
import { createRestaurant, deleteRestaurantById, deleteRestaurantsByUserIdTransaction, findAndUpdateRestaurantById, findRestaurantById, findRestaurants, findRestaurantsByCustomQuery, findRestaurantsByName, findRestaurantsByUserId } from '../services/CRUD/restaurant.service';

export const registerRestaurant = requestHandler<Restaurant>(async (req, res) => {
	try {
		const restaurant = req.body;
		const newRestaurant = await createRestaurant(restaurant);

		if ( !newRestaurant )
			return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
			// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));

		respond(res, StatusCodes.CREATED, Message.SuccessCreate, restaurant);
	} catch (error) {
		console.log(error);
		respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.ServerError);
		// next(new CustomError(Message.ServerError, StatusCodes.INTERNAL_SERVER_ERROR));
	}
});

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export const getAllRestaurants = requestHandler(async (req, res) => {
	try {
		const restaurants = await findRestaurants();
		respond(res, StatusCodes.OK, Message.SuccessRead, restaurants);
	} catch (error) {
		respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.ServerError, '', error);
		// next(new CustomError(Message.ServerError, StatusCodes.INTERNAL_SERVER_ERROR));
	}
});

export const getRestaurantById = requestHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));

	const restaurant = await findRestaurantById(id);
	if ( !restaurant ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	respond(res, StatusCodes.OK, Message.SuccessRead, restaurant);
});

export const getRestaurantsByUserId = requestHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));

	const restaurants = await findRestaurantsByUserId(id);
	if ( !restaurants ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	respond(res, StatusCodes.OK, Message.SuccessRead, restaurants);
});

export const getRestaurantsByName = requestHandler(async (req, res) => {
	const name = req.params.name;
	if ( !name ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));

	const restaurants = await findRestaurantsByName(name);
	if ( !restaurants ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	respond(res, StatusCodes.OK, Message.SuccessRead, restaurants);
});
// TODO: Reimplement this
export const getRestaurantsByCustomQuery = requestHandler<FilterQuery<Restaurant>>(async (req, res) => {
	const filter = req.body;
	if ( !filter ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const restaurants = await findRestaurantsByCustomQuery(filter);
	if ( !restaurants ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	respond(res, StatusCodes.OK, Message.SuccessRead, restaurants);
});

export const updateRestaurantById = requestHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));

	const updatedRestaurant = await findAndUpdateRestaurantById(id, req.body);
	if ( !updatedRestaurant ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));
	
	respond(res, StatusCodes.OK, Message.SuccessUpdate, updatedRestaurant);
});

export const deleteRestaurant = requestHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));

	const deletedRestaurant = await deleteRestaurantById(id);
	if ( !deletedRestaurant ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	respond(res, StatusCodes.OK, Message.SuccessDelete, deletedRestaurant);
});

export const deleteUserRestaurantsTransaction = requestHandler(async (req, res) => {
	const session = await mongoose.startSession();
	try {
		const userId = req.params.userId;
		if ( !userId ) 
			return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
			// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));

		session.startTransaction();
		await deleteRestaurantsByUserIdTransaction(userId, session);
		await session.commitTransaction();

		respond(res, StatusCodes.OK, '', Message.SuccessDelete);
	} catch (error) {
		console.log('Error in transaction');
		console.log(error);
		await session.abortTransaction();
		respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.ServerError);
	} finally {
		await session.endSession();
	}
});