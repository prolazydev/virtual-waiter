import validator from 'validator';
import { Schema, type InferSchemaType, model, Document } from 'mongoose';

import { cotactsSchema, hours } from '@/db/models/Business/props';
import { BusinessCategoryModel } from '@/db/models/BusinessCategory';

export interface IBusiness extends Document {
	userId: Schema.Types.ObjectId;

	owners: [{ type: Schema.Types.ObjectId, ref: 'User', select: false; }],
	managers: [{ type: Schema.Types.ObjectId, ref: 'User', select: false; }],

	displayName: string;
	username: string;
	contacts: {
		contactType: string;
		value: string;
	}[];
	email: string;
	userEmail: string;
	streetAddress?: {
		primary?: {
			main: string;
			zipCode: string;
		},
		secondary?: {
			main: string;
			zipCode: string;
		},
	};
	phone?: string;
	description?: string;
	location?: {
		name?: string;
		city?: string;
		state?: string;
		zipCode?: string;
		id: string;
	};
	country?: string;
	profileImage?: string;
	coverImage?: string;
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
	owners: [ { type: Schema.Types.ObjectId, ref: 'User', select: false } ],
	managers: [ { type: Schema.Types.ObjectId, ref: 'User', select: false } ],
	displayName: {
		type: String,
		trim: true,
		required: false,
	},
	username: {
		type: String,
		required: [ true, 'Username is required!' ],
		unique: true,
		trim: true,
		minLength: [ 2, 'Username must have at least 2 characters!' ],
		maxLength: [ 30, 'Username cannot exceed 30 characters!' ], // Standard from Instagram
		validator: [ validator.isAlphanumeric, 'Invalid username' ],
		validate: {
			validator: function (value: string) {
				const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
				return usernameRegex.test(value);
			},
			message: 'Username can contain only letters, numbers, underscores, hyphens and periods.'
		},
	},
	contacts: [ cotactsSchema ],
	email: {
		type: String,
		required: [ true, 'Business Email is required!' ],
		unique: true,
		validator: [ validator.isEmail, 'Invalid email!' ]
	},
	userEmail: {
		type: String,
		required: [ true, 'User Email is required!' ],
		// unique: true, 
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
		name: {
			type: String,
			required: false,
		},
		city: {
			type: String,
			required: false,
		},
		state: {
			type: String,
			required: false,
		},
		zipCode: {
			type: String,
			required: false,
		},
		id: {
			type: String,
			required: true,
		},
	},
	country: {
		type: String,
		required: false,
	},
	profileImage: String,
	coverImage: String,
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
	// totalRates: Number,
	averageRating: {
		type: Number,
		required: true,
		default: 0,
		min: 0,
		max: 5,
	},
	reviews: {
		type: Number,
		required: true,
		min: 0,
		default: 0,
	},
	reviewPoints: {
		type: Number,
		required: true,
		min: 0,
		default: 0,
	},
	categories: {
		type: [ String ],
		required: false,
		validate: {
			validator: async function (categoriesValue: string[]) {
				if (!categoriesValue.length) return true;
				const validCategories = (await BusinessCategoryModel.exists({ name: { $in: categoriesValue } }))?._id ? true : false;
				return validCategories;
			},
			message: (props: { value: string[]; }) => `Category "${ props.value }" does not exist!`,
		},
	},
	streetAddress: {
		primary: {
			main: {
				type: String,
				required: false,
			},
			zipCode: {
				type: String,
				required: false,
			},
		},
		secondary: {
			main: {
				type: String,
				required: false,
			},
			zipCode: {
				type: String,
				required: false,
			},
		},
	},
	website: {
		type: String,
		required: false,
		validate: {
			validator: (websiteValue: string) => validator.isURL(websiteValue),
			message: (props: { value: string; }) => `"${ props.value }" is not a valid URL!`,
		}
	},
	confirmationCode: {
		type: Number,
		required: false,
		select: false,
	},
	confirmationCodeExpiry: {
		type: Date,
		required: false,
		select: false,
	},
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
}, { timestamps: true, versionKey: false });

export type Business = InferSchemaType<typeof businessSchema>;
export const BusinessModel = model('Businesses', businessSchema);