export type BusinessItem = {
	id: string;
	name: string;
	address: string;
	phone: string;
	email: string;
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
