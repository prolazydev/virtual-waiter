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
		default: false,
	},
}, { timestamps: true });

businessReviewSchema.pre('save', async function (next) {
	const rates = await findBusinessReviewsByBusinessId(this.businessId).lean();
	const business = await findBusinessById(this.businessId);

	if (!business) {
		throw new Error('Business not found');
	}

	const totalRates = rates.reduce((acc, rate) => acc + rate.rate, 0);

	business.totalRates = totalRates;
	business.averageRating = totalRates / rates.length;
	await business!.save();

	next();
});


export type BusinessReview = InferSchemaType<typeof businessReviewSchema>;
export const BusinessReviewModel = mongoose.model('business_reviews', businessReviewSchema);