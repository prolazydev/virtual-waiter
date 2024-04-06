import mongoose, { InferSchemaType } from 'mongoose';

const productSchema = new mongoose.Schema({
	userId: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'users',
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
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		trim: true,
	},
	price: Number,
	currency: {
		type: String,
		required: false,
		default: 'EURO',
	},
	// quantity: {
	// 	type: Number,
	// 	required: true,
	// },
	image: {
		type: [ Buffer ],
		required: [ true, 'Image is required!' ], 
	},
	averageRating: {
		type: Number,
		default: 0,
		min: 0,
		max: 5,
	},
	reviews: {
		type: Number,
		required: true,
	},
	deleted: {
		type: Boolean,
		default: false,
	}
}, { timestamps: true });

export type Product = InferSchemaType<typeof productSchema>;
export const ProductModel = mongoose.model('products', productSchema);