import type { UserReview } from '../userReview';
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
	username: string;
	displayName: string;
	email: string;
	userEmail: string;
	country?: string;
	streetAddress?: StreetAddresses;
	phone?: string;
	/** List of owned email and/phone numbers */
	contacts: BusinessContact[];
	description?: string;
	location?: string;
	profileImage?: string;
	coverImage?: string;
	hours?: Hours;
	is24: boolean;
	averageRating: number;
	reviews: number;
	userReviews: UserReview[];
	reviewPoints?: number;
	attributes?: string[];
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

type BusinessContact = {
	contactType: 'email' | 'phone';
	value: string;
}

export type BusinessEdit = {
	userId: string;
	username: string;
	displayName: string;
	email: string;
	userEmail: string;
	phone?: string;
	/** List of owned email and/phone numbers */
	contacts: BusinessContact[];
	country?: string;
	streetAddress?: StreetAddresses;
	description?: string;
	location?: string;
	profileImage?: Buffer;
	coverImage?: Buffer;
	hours?: Hours;
	is24: boolean;
	attributes?: string[];
	categories?: string[];
	website?: string;
	takesReservations: boolean;
	delivery: boolean;
	takeout: boolean;
}

export type BusinessCategory = {
	userId: string;
	name: string;
	parentCategories: string[];
	description?: string;
}

export type CreateBusinessModel = {
	userId: string;
	name: string;
	email: string;
	userEmail: string;
	phone?: string;
	streetAddress?: StreetAddresses;	
	description?: string;
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

export type Days = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type BusinessDashboardTabTitles = 'Home' | 'Business' | 'Conversations' | 'Orders' | 'Products' | 'Reports' | 'Settings';

export type BusinessDashboardTab = {
	name: BusinessDashboardTabTitles;
	icon: IconKeys;
};

export type BusinessSettingsTabTitles = 'General' | 'Access' | 'Account' | 'Billing' | 'Subscription' | 'Security' | 'Notifications';

export type BusinessSettingsTab = {
	name: BusinessSettingsTabTitles;
	icon: IconKeys;
};
