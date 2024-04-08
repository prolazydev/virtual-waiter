import type { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { BusinessReviewModel, type BusinessReview } from '../../db/models/BusinessReview';
import type mongoose from 'mongoose';

// POST
export const createBusinessReview = async (businessReview: BusinessReview) =>
	new BusinessReviewModel(businessReview).save();
	
// GET
export const findAllBusinessReviews = async () => await BusinessReviewModel.find();

export const findBusinessReviewById = (id: string) => BusinessReviewModel.findById(id);
export const findBusinessReviewsByUserId = (userId: string) => BusinessReviewModel.find({ userId });
export const findBusinessReviewsByBusinessId = (businessId: string | mongoose.Schema.Types.ObjectId) => BusinessReviewModel.find({ businessId });

export const findBusinessReviewByCustomQuery = (filter?: FilterQuery<BusinessReview>, projection?: ProjectionType<BusinessReview>, options?: QueryOptions<BusinessReview>) => BusinessReviewModel.findOne(filter, projection, options);
export const findBusinessReviewsByCustomQuery = (filter: FilterQuery<BusinessReview>, projection?: ProjectionType<BusinessReview>, options?: QueryOptions<BusinessReview>) => BusinessReviewModel.find(filter, projection, options);

// PATCH
export const findAndUpdateBusinessReviewById = async (id: string, values: BusinessReview) =>
	BusinessReviewModel.findByIdAndUpdate(id, values, { new: true, runValidators: true });

// DELETE
export const findAndDeleteBusinessReviewById = async (id: string) =>
	BusinessReviewModel.findByIdAndUpdate(id, { 'deleted': true }, { new: true, runValidators: true });

