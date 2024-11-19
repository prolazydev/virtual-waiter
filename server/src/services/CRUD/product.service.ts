import { FilterQuery, ProjectionType, QueryOptions, startSession, type Types } from 'mongoose';

import { type Product, ProductModel } from '@/db/models/Product';

// POST
export const createProduct = async (product: Product) => 
	new ProductModel(product).save();

// GET
export const findAllProducts = async () => await ProductModel.find();

export const findProductById = (id: string | Types.ObjectId) => ProductModel.findById(id);
export const findProductsByUserId = (userId: string | Types.ObjectId) => ProductModel.find({ userId });
export const findProductsByName = (name: string | Types.ObjectId) => ProductModel.find({ name });
export const findProductsByBusinessId = (businessId: string | Types.ObjectId) => ProductModel.find({ businessId });

export const findProductByCustomQuery = (filter?: FilterQuery<Product>, projection?: ProjectionType<Product>, options?: QueryOptions<Product>) => ProductModel.findOne(filter, projection, options);
export const findProductsByCustomQuery = (filter: FilterQuery<Product>, projection?: ProjectionType<Product>, options?: QueryOptions<Product>) => ProductModel.find(filter, projection, options);

// PATCH
export const findAndUpdateProductById = async (id: string | Types.ObjectId, values: Product) => 
	ProductModel.findByIdAndUpdate(id, values, { new: true, runValidators: true });

// DELETE
export const findAndDeleteProductById = async (id: string | Types.ObjectId) => 
	ProductModel.findByIdAndUpdate(id, { 'deleted': true }, { new: true, runValidators: true });
export const deleteProductsByUserId = async (userId: string | Types.ObjectId) => {
	const session = await startSession();
	session.startTransaction();

	try {
		await ProductModel.updateMany({ userId }, { deleted: true }, { session });

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