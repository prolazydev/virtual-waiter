
import { icons as myIcons } from 'lucide-vue-next'

export type IconKeys = keyof typeof myIcons;


export enum ESortType {
	TopPicks = 'Top Picks',
	PriceLowToHigh = 'Price (Low to High)',
	PriceHighToLow = 'Price (High to Low)',
	RestaurantRatingLowToHigh = 'Restaurant Rating (Low to High)',
	RestaurantRatingHighToLow = 'Restaurant Rating (High to Low)',
	// ASC = 'asc',
  	// DESC = 'desc',
};

export type SortType = ESortType ;


export type SliderEvent<T> = {
	detail: T
} & Event;

// const test: SliderEvent = {

// }