import validator from 'validator';
import  { Schema, type InferSchemaType, model, Document } from 'mongoose';

import { hours } from './props';
import { BusinessCategoryModel } from '../BusinessCategory';

export interface IBusiness extends Document {
	userId: Schema.Types.ObjectId;
	name: string;
	email: string;
	userEmail: string;
	streetAddress?: string[];
	phone?: string;
	description?: string;
	location?: string;
	profileImage?: Buffer;
	coverImage?: Buffer;
	hours: typeof hours;
	is24: boolean;
	attributes?: string[];
	averageRating?: number;
	reviews?: number;
	reviewPoints?: number;
	categories?: string[];
	website?: string;
	confirmationCode?: number;
	confirmationCodeExpiry?: Date;
	confirmed?: boolean;
	deleted?: boolean;
	banned?: boolean;
}

const businessSchema = new Schema<IBusiness>({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	name: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String, 
		required: [ true, 'Business Email is required!' ], 
		unique: true, 
		validator: [ validator.isEmail, 'Invalid email!' ]
	},
	userEmail: {
		type: String, 
		required: [ true, 'User Email is required!' ], 
		unique: true, 
		validator: [ validator.isEmail, 'Invalid email!' ]
	},
	phone: String,
	description: {
		type: String,
		trim: true,
		required: false,
	},
	// TODO: have it be a google map pin
	location: {
		type: String,
		required: false,
	},
	profileImage: Buffer,
	coverImage: Buffer,
	hours,
	is24: {
		type: Boolean,
		required: true,
		default: false,
	},
	attributes: {
		type: [ String ],
		required: false,
	},
	// medianPriceRange: {
	// 	type: Number,
	// 	required: false,
	// },
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
		default: 0,
	},
	reviewPoints: {
		type: Number,
		required: false,
		default: 0,
	},	
	categories: {
		type: [ String ],
		required: false,
		validate: {
			validator: async function(categoriesValue: string[]) {
				if (!categoriesValue.length) return true;
				const validCategories = (await BusinessCategoryModel.exists({ name: { $in: categoriesValue } }))?._id ? true : false;
				return validCategories; 
			},
			message: (props: { value: string[] }) => `Category "${props.value}" does not exist!`,
		},
	},
	streetAddress: {
		primary: String,
		secondary: String,
	},
	website: {
		type: String,
		required: false,
		validate: {
			validator: function(websiteValue: string) {
				return validator.isURL(websiteValue);
			},
			message: (props: { value: string }) => `"${props.value}" is not a valid URL!`,
		}
	},
	confirmationCode: Number,
	confirmationCodeExpiry: Date,
	confirmed: {
		type: Boolean,
		required: false,
		default: false,
	},
	deleted: {
		type: Boolean,
		required: false,
		default: false,
	},
	banned: {
		type: Boolean,
		required: false,
		default: false,
		select: false,
	},
}, { timestamps: true });

export type Business = InferSchemaType<typeof businessSchema>;
export const BusinessModel = model('Businesses', businessSchema);