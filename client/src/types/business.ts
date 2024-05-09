import type { BaseDocument } from './common';

export type BusinessItem = {
	_id: string;
	userId: string;
	name: string;
	email: string;
	userEmail: string;
	streetAddress?: StreetAddresses;
	phone?: string;
	description?: string;
	location?: string;
	profileImage?: string;
	coverImage?: string;
	hours?: Hours;
	is24: boolean;
	attributes?: string[];
	averageRating: number;
	reviews: number;
	userReviews: UserReview[];
	reviewPoints?: number;
	categories?: string[];
	website?: string;
	confirmationCode?: number;
	confirmationCodeExpiry?: Date;
	verified: boolean;
	confirmed: boolean;
	deleted: boolean;
	banned: boolean;
}
type Hours = {
	monday: string;
	tuesday: string;
	wednesday: string;
	thursday: string;
	friday: string;
	saturday: string;
	sunday: string;
}

export type KeyHours = keyof Hours;

type StreetAddresses = {
	primary?: {
		main: string;
		zipCode: string;
	};
	secondary?: {
		main: string;
		zipCode: string;
	};
}

export type CreateBusinessModel = {
	userId: string;
	name: string;
	email: string;
	userEmail: string;
	phone?: string;
	streetAddress?: StreetAddresses;	
	description?: string;
	city?: string;
	zipCode?: string
	categories?: string[];
	// location?: string;
	hours: Hours;
	profileImage?: Buffer;
	coverImage?: Buffer;
	is24: boolean;
	attributes?: string[];
	website?: string;
}

export type BusinessCategory = {
	userId: string;
	name: string;
	parentCategories: string[];
	description?: string;
}

export type UserReview = {
	userId: string;
	businessId: string;
	rating: number;
	review: string;
} & BaseDocument;
