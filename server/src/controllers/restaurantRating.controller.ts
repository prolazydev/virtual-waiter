import { StatusCodes } from 'http-status-codes';
import { createRestaurantRating } from '../services/CRUD/restaurantRating.service';
import { respond } from '../utils/common';
import { Message } from '../utils/common/ServerResponseMessages';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { RestaurantRate } from '../db/models/RestaurantRate';

export const newRestaurantRating = asyncErrorHandler<RestaurantRate>(async (req, res) => {
	try {
		const restaurantRating = req.body;
	
		const newRestaurantRating = await createRestaurantRating(restaurantRating);
		if ( !newRestaurantRating )
			return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
			// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));
	
		respond(res, StatusCodes.OK, Message.SuccessCreate);
		// respond(res, StatusCodes.OK, '', Message.SuccessCreate);
	} catch (error) {
		console.log(error);
		respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.ServerError, '', error);
		// next(new CustomError(Message.ServerError, StatusCodes.INTERNAL_SERVER_ERROR));
	}
});