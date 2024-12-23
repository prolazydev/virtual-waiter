import mongoose, { InferSchemaType } from 'mongoose';

const restaurantSchema = new mongoose.Schema({
	userId: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'users',
		required: true, 
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		trim: true,
		required: false,
	},
	location: {
		type: String,
		required: false,
	},
	// priceRange: {
	// 	type: Number,
	// 	required: false,
	// },
	medianPriceRange: {
		type: Number,
		required: false,
	},
	image: { type: Buffer },
	averageRating: {
		type: Number,
		default: 0,
		min: 0,
		max: 5,
		required: false,
	},
	reviews: {
		type: Number,
		required: false,
	},
	deleted: {
		type: Boolean,
		default: false,
	},
	banned: {
		type: Boolean,
		required: false,
		default: false,
		select: false,
	},
}, { timestamps: true });

export type Restaurant = InferSchemaType<typeof restaurantSchema>;
export const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);
