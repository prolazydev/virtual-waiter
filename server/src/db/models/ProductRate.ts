import mongoose, { InferSchemaType } from 'mongoose';
import { ProductModel } from './Product';

const productRateSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'products',
		required: true,
	},
	restaurantId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'restaurants',
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

productRateSchema.pre('save', async function (next) {	
	const rates = await ProductRateModel.find({ restaurantId: this.restaurantId }).lean();
	const product = await ProductModel.findById(this.productId);

	const totalRates = rates.reduce((acc, rate) => acc + rate.rate, 0);

	product!.averageRating = totalRates / rates.length;
	await product!.save();

	next();
});

export type ProductRate = InferSchemaType<typeof productRateSchema>;
export const ProductRateModel = mongoose.model('productRates', productRateSchema);

