import mongoose, { InferSchemaType } from 'mongoose';


const ProductCategorySchema = new mongoose.Schema({
	name: String,
	description: String,
	icon: String,
});

export type ProductCategory = InferSchemaType<typeof ProductCategorySchema>;
export const ProductCategoryModel = mongoose.model('product_categories', ProductCategorySchema);