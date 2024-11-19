import { startSession, type FilterQuery, type ProjectionType, type QueryOptions, type Types } from 'mongoose';

import { type ProductReview, ProductReviewModel } from '@/db/models/ProductReview';

// POST
export const createProductReview = async (productReview: ProductReview) =>
	new ProductReviewModel(productReview).save();

// GET
export const findAllProductReviews = async () => await ProductReviewModel.find();

export const findProductReviewById = (id: string | Types.ObjectId) => ProductReviewModel.findById(id);
export const findProductReviewsByUserId = (userId: string | Types.ObjectId) => ProductReviewModel.find({ userId });
export const findProductReviewsByBusinessId = (businessId: string | Types.ObjectId, projection?: ProjectionType<ProductReview>, options?: QueryOptions<ProductReview>) =>
	ProductReviewModel.find({ businessId }, projection, options);
export const findProductReviewsByProductId = (productId: string | Types.ObjectId, projection?: ProjectionType<ProductReview>, options?: QueryOptions<ProductReview>) =>
	ProductReviewModel.find({ productId }, projection, options);

export const findProductReviewByCustomQuery = (filter?: FilterQuery<ProductReview>, projection?: ProjectionType<ProductReview>, options?: QueryOptions<ProductReview>) => ProductReviewModel.findOne(filter, projection, options);
export const findProductReviewsByCustomQuery = (filter: FilterQuery<ProductReview>, projection?: ProjectionType<ProductReview>, options?: QueryOptions<ProductReview>) => ProductReviewModel.find(filter, projection, options);

// PATCH
export const findAndUpdateProductReviewById = async (id: string | Types.ObjectId, values: ProductReview) =>
	ProductReviewModel.findByIdAndUpdate(id, values, { new: true, runValidators: true });

// DELETE
export const findAndDeleteProductReviewById = async (id: string | Types.ObjectId) =>
	ProductReviewModel.findByIdAndUpdate(id, { 'deleted': true }, { new: true, runValidators: true });
export const deleteProductReviewsByUserId = async (userId: string | Types.ObjectId) => {
	const session = await startSession();
	session.startTransaction();

	try {
		await ProductReviewModel.updateMany({ userId }, { deleted: true }, { session });

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