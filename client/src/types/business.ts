import type { UserReview } from './userReview';
import type { IconKeys } from "@/types";

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
		address: string;
		zipCode: string;
	};
	secondary?: {
		address: string;
		zipCode: string;
	};
}

export type Business = {
	_id: string;
	userId: string;
	name: string;
	email: string;
	userEmail: string;
	country?: string;
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
	takesReservations: boolean;
	delivery: boolean;
	takeout: boolean;
	confirmationCode?: number;
	confirmationCodeExpiry?: Date;
	verified: boolean;
	confirmed: boolean;
	deleted: boolean;
	banned: boolean;
}

export type BusinessCategory = {
	userId: string;
	name: string;
	parentCategories: string[];
	description?: string;
}

export type CreateBusinessModel =
	{
	userId: string;
	name: string;
	email: string;
	userEmail: string;
	phone?: string;
	streetAddress?: StreetAddresses;	
	description?: string;
	// city?: string;
	// zipCode?: string
	country?: string;
	location?: string;
	categories?: string[];
	hours: Hours;
	profileImage?: Buffer;
	coverImage?: Buffer;
	is24: boolean;
	attributes?: string[];
	website?: string;
}

export type BusinessDashboardTabTitles = 'Home' | 'Business' | 'Conversations' | 'Orders' | 'Products' | 'Reports' | 'Settings';

export type BusinessDashboardTab = {
	name: BusinessDashboardTabTitles;
	icon: IconKeys;
}