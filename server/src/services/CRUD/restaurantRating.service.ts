import { RestaurantRate, RestaurantRateModel } from '../../db/models/RestaurantRate';

// POST
export const createRestaurantRating = async (restaurantRating: RestaurantRate) => 
	new RestaurantRateModel(restaurantRating).save();