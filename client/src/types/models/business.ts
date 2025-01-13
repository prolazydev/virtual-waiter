import type { UserReview } from '../userReview';
import type { IconKeys, LoadingState } from "@/types";

export type Hours = {
	monday: string;
	tuesday: string;
	wednesday: string;
	thursday: string;
	friday: string;
	saturday: string;
	sunday: string;
}
export type KeyHours = keyof Hours;

export type StreetAddresses = {
	primary?: {
		main: string;
		zipCode: string;
	};
	secondary?: {
		main: string;
		zipCode: string;
	};
}
// TODO: also add dineIn in front and backend
export type Business = {
	_id: string;
	userId: string;
	username: string;
	displayName: string;
	email: string;
	userEmail: string;
	country?: string;
    /**
     * Object containing 2 properties (primary & secondary), street address and zip code for each prop
     */
	streetAddress?: StreetAddresses;
	phone?: string;
	/** List of owned email and/phone numbers */
	contacts: BusinessContact[];
	description?: string;
	location?: string;
	profileImage?: string;
	coverImage?: string;
    /**
     * Object containing the hours of operation for each day of the week,
     * in the form of string (09:00-17:00), boolean if it's 24hrs for true and closed for false
     */
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

type BusinessPropertyName = keyof Business;

export type BusinessPropertyType<T extends BusinessPropertyName> = Business[T];

export type BusinessFormFields = {
    username: {
        state: LoadingState | 'edit';
        value?: string;
    },
    displayName: {
        state: LoadingState | 'edit';
        value?: string;
    },
    email: {
        state: LoadingState | 'edit';
        value?: string;
    },
    phone: {
        state: LoadingState | 'edit';
        value?: string;
    },
    streetAddress: {
        state: LoadingState | 'edit';
        value?: StreetAddresses;
    },
    description: {
        state: LoadingState | 'edit';
        value?: string;
    },
    location: {
        state: LoadingState | 'edit';
        value: {
			name?: string;
			city: string;
			state?: string;
			zipCode?: string;
			id?: string;
		};
    },
    country: {
        state: LoadingState | 'edit';
        // TODO: have it be a list of countries
        value?: string
    },
    profileImage: {
        state: LoadingState | 'edit' | 'preview';
        value?: string;
    },
    coverImage: {
        state: LoadingState | 'edit' | 'preview';
        value?: string;
    },
    hours: {
        state: LoadingState | 'edit';
        value?: Hours;
    },
    is24: {
        state: LoadingState | 'edit';
        value?: boolean;
    },
    attributes: {
        state: LoadingState | 'edit';
        value?: string[];
    },
    categories: {
        state: LoadingState | 'edit';
        value?: string[];
    },
    website: {
        state: LoadingState | 'edit';
        value?: string;
    },
    takesReservations: {
        state: LoadingState | 'edit';
        value?: boolean;
    },
    delivery: {
        state: LoadingState | 'edit';
        value?: boolean;
    },
    takeout: {
        state: LoadingState | 'edit';
        value?: boolean;
    },
}
export type BusinessContact = {
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

export type BusinessFormFieldKeys = keyof BusinessFormFields;
export type BusinessQueryFieldKeys = keyof Business;

export type BusinessCategory = {
	userId: string;
	name: string;
	parentCategories: string[];
	description?: string;
}

export type CreateBusinessModel = {
	userId: string;
	displayName: string;
	email: string;
	userEmail: string;
	phone?: string;
	streetAddress?: StreetAddresses;	
	description?: string;
	country?: string;
	location?: {
		name?: string;
		city: string;
		state?: string;
		zipCode?: string;
		id: string;
	};
	categories?: string[];
	hours: Hours;
	profileImage?: Buffer;
	coverImage?: Buffer;
	is24: boolean;
	attributes?: string[];
	website?: string;
}

export type Days = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type BusinessDashboardTabTitles = 'home' | 'business' | 'conversations' | 'orders' | 'products' | 'reports' | 'analytics' | 'settings';

export type BusinessDashboardTab = {
	name: BusinessDashboardTabTitles;
	icon: IconKeys;
};

export type BusinessSettingsTabTitles = 'general' | 'access & roles' | 'account' | 'billing' | 'products' | 'subscription' | 'analytics' | 'security' | 'notifications';

export type BusinessSettingsTab = {
	name: BusinessSettingsTabTitles;
	icon: IconKeys;
};

export type TabMap = {
    lastBusinessDashboardTab: BusinessDashboardTabTitles;
    lastBusinessSettingsTab: BusinessSettingsTabTitles;
};

export type EditContactField = {
	type: 'email' | 'phone';
	value: string;
	state?: 'edit' | 'idle' | 'save';
	processingState?: 'idle' | 'loading'  | 'success' | 'error';
}

export type BusinessLocationData = {
	features: Array<{
	  geometry: {
		coordinates: Array<number>
		type: string
	  }
	  type: string
	  properties: {
		osm_type: string
		osm_id: number
		extent?: Array<number>
		country: string
		osm_key: string
		countrycode: string
		osm_value: string
		name: string
		type: string
		city?: string
		postcode?: string
		locality?: string
		street?: string
		district?: string
		housenumber?: string
		county?: string
		state?: string
	  }
	}>
	type: string
  }