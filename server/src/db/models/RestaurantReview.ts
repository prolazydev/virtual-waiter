/* eslint-disable  @typescript-eslint/no-explicit-any */
import mongoose, { InferSchemaType } from 'mongoose';
import { RestaurantModel } from './Restaurant';

const restaurantReviewSchema = new mongoose.Schema({
	// User who submitted the rating
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users', 
		required: true,
	},
	// Restaurant being rated
	restaurantId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Restaurant', // Reference to the Restaurant model
		required: true,
	},
	rating: {
		type: Number,
		required: true,
		min: 1, // Minimum rating (adjust as needed)
		max: 5, // Maximum rating (adjust as needed)
	},
	review: { type: String, trim: true, required: false },
}, { timestamps: true });

restaurantReviewSchema.pre('save', async function (next) {
	const restaurantId = this.restaurantId.toString();
	const rates = await RestaurantReviewModel.find({ restaurantId }).lean();
	rates.push(this);
	const restaurant = await RestaurantModel.findById(this.restaurantId);

	const totalRates = rates.reduce((acc, rate) => acc + rate.rating, 0);
	restaurant!.averageRating = parseFloat((totalRates / rates.length).toFixed(2));
	await restaurant!.save();
	
	next();
});

export type RestaurantReview = InferSchemaType<typeof restaurantReviewSchema>;
export const RestaurantReviewModel = mongoose.model('restaurant_rates', restaurantReviewSchema);
