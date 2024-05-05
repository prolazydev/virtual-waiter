import mongoose, { type InferSchemaType } from 'mongoose';
import { findBusinessById } from '../../services/CRUD/business.service';
import { findBusinessReviewsByBusinessId } from '../../services/CRUD/businessReview.service';

export interface BusinessReviewDocument extends mongoose.Document {
	businessId: mongoose.Schema.Types.ObjectId;
	userId: mongoose.Schema.Types.ObjectId;
	rate: number;
	review: string;
	deleted: boolean;
}

const businessReviewSchema = new mongoose.Schema<BusinessReviewDocument>({
	businessId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'businesses',
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	rate: {
		type: Number,
		required: true,
		min: 0,
		max: 5,
	},
	review: {
		type: String,
		required: false,
	},
	deleted: {
		type: Boolean,
		required: false,
		default: false,
	},
}, { timestamps: true });

businessReviewSchema.post('save', async function (review) {
	const rates = await findBusinessReviewsByBusinessId(review.businessId, undefined, { lean: true });
	const business = await findBusinessById(review.businessId);
	if ( !business ) 
		throw new Error('Business not found');

	const reviews = rates.length;
	const averageRating = rates.reduce((acc, rate) => acc + rate.rate, 0) / reviews;

	business.reviews = reviews;
	business.averageRating = averageRating;

	await business.save();
});


export type BusinessReview = InferSchemaType<typeof businessReviewSchema>;
export const BusinessReviewModel = mongoose.model('business_reviews', businessReviewSchema);