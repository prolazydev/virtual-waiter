import { startSession, type ClientSession, type FilterQuery, type QueryOptions, type UpdateQuery } from 'mongoose';
import type { UpdateOptions } from 'mongodb';

import { type BusinessCategory, BusinessCategoryModel } from '@/db/models/BusinessCategory';
import { regexFuzzySearch } from '@/utils/common';

// POST
export const createBusinessCategory = async (businessCategory: BusinessCategory) =>
	new BusinessCategoryModel(businessCategory).save();

// GET
export const findAllBusinessCategories = async () => BusinessCategoryModel.find();
export const findBusinessCategoryById = (id: string) => BusinessCategoryModel.findById(id);
// export const findBusinessCategoriesByName = (name: string) => BusinessCategoryModel.find({ name: regexFuzzySearch(name) }).select({ name: 1, parentCategories: 1 });
// return BusinessCategoryModel.find({ name: regexFuzzySearch(name) }).select({ name: 1, parentCategories: 1 }).limit(20);
export const findBusinessCategoriesByName = (name: string) => BusinessCategoryModel.aggregate([ 
	{
		$addFields: {
			// Create a new field to store the length of the property name
			propertyNameLength: { $strLenCP: '$name' }
		}
	},
	{
		$addFields: {
			// Create a new field indicating whether the query matches the beginning
			matchedStart: { $eq: [ { $substrCP: [ '$name', 0, name.length ] }, name ] }
		}
	},
	{
		$match: {
			$or: [
				// Match documents where the field starts with the name
				{ name: { $regex: regexFuzzySearch(name) } },
				// Match documents where the field matches the query fuzzily
				{ fuzzyMatch: true }
			]
		}
	},
	{
		$sort: {
			// Sort by the length of the property name in ascending order
			propertyNameLength: 1,
			// Sort by the new field, true will come before false
			matchedStart: -1,
			// You can also sort by other fields here if needed
		}
	},
	{ $limit: 20, },
]);

export const findBusinessCategoriesByCustomQuery = (query: FilterQuery<BusinessCategory>) => BusinessCategoryModel.find(query);
export const findBusinessCategoryByCustomQuery = (query: FilterQuery<BusinessCategory>) => BusinessCategoryModel.findOne(query);

// PATCH
export const findAndUpdateBusinessCategoryById = async (id: string, values: UpdateQuery<BusinessCategory>, options: QueryOptions<BusinessCategory> = { new: true, runValidators: true }) =>
	BusinessCategoryModel.findByIdAndUpdate(id, values, options);

export const findAndUpdateBusinessByCustomQuery = async (query: FilterQuery<BusinessCategory>, values: UpdateQuery<BusinessCategory>, options: (UpdateOptions & QueryOptions<BusinessCategory>) = { new: true, runValidators: true }) =>
	BusinessCategoryModel.updateMany(query, values, options);

// DELETE
export const deleteBusinessCategoryById = async (id: string) =>
	BusinessCategoryModel.findByIdAndUpdate(id, { deleted: true }, { new: true, runValidators: true });

export const deleteBusinessCategoriesByUserId = async (userId: string) => {
	const session = await startSession();
	// session.startTransaction();

	try {
		await BusinessCategoryModel.updateMany({ userId }, { deleted: true }, { session });

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

export const deleteBusinessCategoriesByUserIdTransaction = async (userId: string, session: ClientSession) =>
	BusinessCategoryModel.updateMany({ userId }, { deleted: true }, { session });
