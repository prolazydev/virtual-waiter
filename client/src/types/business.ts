export type BusinessItem = {
	_id: string;
	userId: string;
	name: string;
	email: string;
	userEmail: string;
	streetAddress?: string[];
	phone?: string;
	description?: string;
	location?: string;
	profileImage?: string;
	coverImage?: string;
	hours?: Hours;
	is24: boolean;
	attributes?: string[];
	totalRates?: number;
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

type Hours = {
	monday: string;
	tuesday: string;
	wednesday: string;
	thursday: string;
	friday: string;
	saturday: string;
	sunday: string;
}

interface StreetAddresses {
	primary?: string;
	secondary?: string;
}

export interface CreateBusinessModel {
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
