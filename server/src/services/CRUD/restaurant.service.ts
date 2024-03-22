import mongoose, { FilterQuery, ProjectionType, QueryOptions, type ClientSession, type UpdateQuery  } from 'mongoose';
import { UpdateOptions } from 'mongodb';
import { Restaurant, RestaurantModel } from '../../db/models/Restaurant';

// POST
export const createRestaurant = async (restaurant: Restaurant) => 
	new RestaurantModel(restaurant).save();

// GET
export const findRestaurants = async () => await RestaurantModel.find();

export const findRestaurantById = (id: string) => RestaurantModel.findById(id);
export const findRestaurantsByUserId = (userId: string) => RestaurantModel.find({ userId });
export const findRestaurantsByName = (name: string) => RestaurantModel.find({ name });

export const findRestaurantByCustomQuery = (filter?: FilterQuery<Restaurant>, projection?: ProjectionType<Restaurant>, options?: QueryOptions<Restaurant>) => RestaurantModel.findOne(filter, projection, options);
export const findRestaurantsByCustomQuery = (filter: FilterQuery<Restaurant>, projection?: ProjectionType<Restaurant>, options?: QueryOptions<Restaurant>) => RestaurantModel.find(filter, projection, options);

// PATCH
export const findAndUpdateRestaurantById = async (id: string, values: UpdateQuery<Restaurant>, options: QueryOptions<Restaurant> = { new: true, runValidators: true }) => 
	RestaurantModel.findByIdAndUpdate(id, values, options);

export const findAndUpdateRestaurantByCustomQuery = async (query: FilterQuery<Restaurant>, values: UpdateQuery<Restaurant>, options: ( UpdateOptions & QueryOptions<Restaurant>)) => 
	RestaurantModel.updateMany(query, values, options);

// DELETE	
export const deleteRestaurantById = async (id: string) => 
	RestaurantModel.findByIdAndUpdate(id, { deleted: true }, { new: true, runValidators: true });
export const deleteRestaurantsByUserId = async (userId: string) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		await RestaurantModel.updateMany({ userId }, { deleted: true }, { session });

		await session.commitTransaction();
		console.log('Transaction committed successfully');
	} catch (error) {
		console.log('Error in transaction');
		await session.abortTransaction();
		console.log('Transaction aborted');
		throw error;		
	} finally {
		session.endSession();
	}
};

export const deleteRestaurantsByUserIdTransaction = async (userId: string, session: ClientSession) => 
	RestaurantModel.updateMany({ userId }, { deleted: true }, { session });

