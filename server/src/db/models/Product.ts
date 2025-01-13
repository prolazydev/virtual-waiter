import mongoose, { InferSchemaType, Schema } from 'mongoose';

const productSchema = new mongoose.Schema({
	userId: { 
		type: Schema.Types.ObjectId, 
		ref: 'users',
		required: true, 
	},
	businessId: {
		type: Schema.Types.ObjectId,
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
	category: { type: Schema.Types.ObjectId, ref: "Product_Category" }, // Reference to ProductCategory
	price: Number,
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