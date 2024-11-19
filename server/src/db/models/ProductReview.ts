import mongoose, { InferSchemaType } from 'mongoose';

import { findProductReviewsByBusinessId } from '@/services/CRUD/productReview.service';
import { findProductById } from '@/services/CRUD/product.service';

const productReviewSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'products',
		required: true,
	},
	// restaurantId: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'restaurants',
	// 	required: true,
	// },
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

// productReviewSchema.pre('save', async function (next) {	
// 	const rates = await findProductReviewsByBusinessId(this.businessId).lean();
// 	const product = await findProductById(this.productId);

// 	const totalRates = rates.reduce((acc, rate) => acc + rate.rate, 0);

// 	product!.averageRating = totalRates / rates.length;
// 	await product!.save();

// 	next();
// });

productReviewSchema.post('save', async function (review) {	
	const rates = await findProductReviewsByBusinessId(review.businessId, undefined, { lean: true });
	const product = await findProductById(review.productId);
	if ( !product ) 
		throw new Error('Product not found');

	const reviews = rates.length;
	const averageRating = rates.reduce((acc, rate) => acc + rate.rate, 0) / reviews;

	product.reviews = reviews;
	product.averageRating = averageRating;

	await product.save();
});

export type ProductReview = InferSchemaType<typeof productReviewSchema>;
export const ProductReviewModel = mongoose.model('product_reviews', productReviewSchema);

