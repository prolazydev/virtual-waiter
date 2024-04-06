import mongoose, { type InferSchemaType } from 'mongoose';

export interface IBusinessCategory extends mongoose.Document {
	userId: mongoose.Schema.Types.ObjectId;
	name: string;
	parentCategories: string[];
	description?: string;
}

const businessCategorySchema = new mongoose.Schema<IBusinessCategory>({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	name: {
		type: String,
		trim: true,
		required: true,
	},
	parentCategories: {
		type: [ String ],
		trim: true,
		required: true,
	},
	description: {
		type: String,
		trim: true,
		required: false,
	},
});

export type BusinessCategory = InferSchemaType<typeof businessCategorySchema>;
export const BusinessCategoryModel = mongoose.model<IBusinessCategory>('business_categories', businessCategorySchema);
