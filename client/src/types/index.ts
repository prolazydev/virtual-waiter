
import { icons as myIcons } from 'lucide-vue-next'

export type IconKeys = keyof typeof myIcons;

export enum ESortType {
	TopPicks = 'Top Picks',
	PriceLowToHigh = 'Price (Low to High)',
	PriceHighToLow = 'Price (High to Low)',
	RestaurantRatingLowToHigh = 'Restaurant Rating (Low to High)',
	RestaurantRatingHighToLow = 'Restaurant Rating (High to Low)',
};

export type SortType = ESortType ;

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'; 

export type SliderEvent<T> = {
	detail: T
} & Event;


type BusinessOpen = {
	openingState: 'Open',
	closingTime: string
}

type BusinessClose = {
	openingState: 'Closed',
	openingTime: string
}

type BusinessClosingSoon = {
	openingState: 'ClosingSoon',
	closingTime: string
}

type BusinessOpeningSoon = {
	openingState: 'OpeningSoon',
	openingTime: string
}

export type BusinessOpenState = | BusinessOpen | BusinessClose | BusinessClosingSoon | BusinessOpeningSoon