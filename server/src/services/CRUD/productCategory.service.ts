import { startSession, type ClientSession, type FilterQuery, type QueryOptions, type UpdateQuery } from 'mongoose';
import type { UpdateOptions } from 'mongodb';

import { type ProductCategory, ProductCategoryModel } from '@/db/models/ProductCateogry';
import { regexFuzzySearch } from '@/utils/common';

// POST
export const createProductCategory = async (productCategory: ProductCategory) =>
    new ProductCategoryModel(productCategory).save();

// GET
export const findAllProductCategories = async () => ProductCategoryModel.find();
export const findProductCategoryById = (id: string) => ProductCategoryModel.findById(id);
export const findProductCategoriesByName = (name: string) => ProductCategoryModel.aggregate([
    {
        $addFields: {
            propertyNameLength: { $strLenCP: '$name' }
        }
    },
    {
        $addFields: {
            matchedStart: { $eq: [{ $substrCP: ['$name', 0, name.length] }, name] }
        }
    },
    {
        $match: {
            $or: [
                { name: { $regex: regexFuzzySearch(name) } },
                { fuzzyMatch: true }
            ]
        }
    },
    {
        $sort: {
            propertyNameLength: 1,
            matchedStart: -1,
        }
    },
    { $limit: 20 },
]);

export const findProductCategoriesByCustomQuery = (query: FilterQuery<ProductCategory>) => 
    ProductCategoryModel.find(query);
export const findProductCategoryByCustomQuery = (query: FilterQuery<ProductCategory>) => 
    ProductCategoryModel.findOne(query);

// PATCH
export const findAndUpdateProductCategoryById = async (
    id: string, 
    values: UpdateQuery<ProductCategory>, 
    options: QueryOptions<ProductCategory> = { new: true, runValidators: true }
) => ProductCategoryModel.findByIdAndUpdate(id, values, options);

export const findAndUpdateProductByCustomQuery = async (
    query: FilterQuery<ProductCategory>, 
    values: UpdateQuery<ProductCategory>, 
    options: (UpdateOptions & QueryOptions<ProductCategory>) = { new: true, runValidators: true }
) => ProductCategoryModel.updateMany(query, values, options);

// DELETE
export const deleteProductCategoryById = async (id: string) =>
    ProductCategoryModel.findByIdAndUpdate(
        id, 
        { deleted: true }, 
        { new: true, runValidators: true }
    );

export const deleteProductCategoriesByUserId = async (userId: string) => {
    const session = await startSession();
    try {
        await ProductCategoryModel.updateMany(
            { userId }, 
            { deleted: true }, 
            { session }
        );
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

export const deleteProductCategoriesByUserIdTransaction = async (
    userId: string, 
    session: ClientSession
) => ProductCategoryModel.updateMany(
    { userId }, 
    { deleted: true }, 
    { session }
);