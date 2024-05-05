import mongoose, { type AggregateOptions, type ClientSession, type FilterQuery, type PipelineStage, type ProjectionType, type QueryOptions, type UpdateQuery } from 'mongoose';
import { UpdateOptions } from 'mongodb';
import { type Business, BusinessModel } from '../../db/models/Business/Business';

// POST
export const createBusiness = async (business: Business) =>
	new BusinessModel(business).save();

// GET
export const findBusinesses = () => BusinessModel.find();

export const findBusinessById = (id: string | mongoose.Schema.Types.ObjectId) => BusinessModel.findById(id);
export const findBusinessesByUserId = (userId: string) => BusinessModel.find({ userId });
export const findBusinessesByName = (name: string) => BusinessModel.find({ name });

export const findBusinessByCustomQuery = (filter?: FilterQuery<Business>, projection?: ProjectionType<Business>, options?: QueryOptions<Business>) => BusinessModel.findOne(filter, projection, options);
export const findBusinessesByCustomQuery = (filter: FilterQuery<Business>, projection?: ProjectionType<Business>, options?: QueryOptions<Business>) => BusinessModel.find(filter, projection, options);

export const findBusinessesByAggregate = async (pipeline?: PipelineStage[], options?: AggregateOptions) =>
	BusinessModel.aggregate(pipeline, options);

// PATCH
export const findAndUpdateBusinessById = async (id: string, values: UpdateQuery<Business>, options: QueryOptions<Business> = { new: true, runValidators: true }) =>
	BusinessModel.findByIdAndUpdate(id, values, options);

export const findAndUpdateBusinessByCustomQuery = async (query: FilterQuery<Business>, values: UpdateQuery<Business>, options: (UpdateOptions & QueryOptions<Business>) = { new: true, runValidators: true }) =>
	BusinessModel.updateMany(query, values, options);

// DELETE
export const deleteBusinessById = async (id: string) =>
	BusinessModel.findByIdAndUpdate(id, { deleted: true }, { new: true, runValidators: true });
export const deleteBusinessesByUserId = async (userId: string) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		await BusinessModel.updateMany({ userId }, { deleted: true }, { session });

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

export const deleteBusinessesByUserIdTransaction = async (userId: string, session: ClientSession) =>
	BusinessModel.updateMany({ userId }, { deleted: true }, { session });