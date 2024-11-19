<template>
	<div class="search-item">
		<div class="flex gap-5">
			<div class="w-72 h-72 overflow-hidden">
				<img :src="photo" alt="food">
			</div>
			<div class="flex flex-col gap-1">
				<router-link to="/" class="hover:underline"><h3 class="text-2xl font-bold">{{ rName }}</h3></router-link>
				<Review :stars="stars" :reviews="reviews" :sizes="20" />
				<!-- Type of Business: Cafe, Restaurant, Grill, Stakehouse, Italian -->
				<div class="flex gap-2 items-center">
					<!-- TODO: Search by type of business -->
					<button><p class=" text-gray-700 hover:underline">{{ typeOfBusiness }}</p></button>
					<!-- • -->
					<div class="w-1 h-1 rounded-full bg-gray-500"></div>

					<!-- TODO: Show city of origin -->
					<button><p class=" text-gray-700 hover:underline">{{ cityOfOrigin }}</p></button>
					<div class="w-1 h-1 rounded-full bg-gray-500"></div>
					<p>~1km from</p>
				</div>
				<!-- TODO: Show if restaurant is open or not -->
				<div class="text-sm">
					<p v-if="rState.openingState === 'Open'"><span class="text-emerald-600 font-bold">Open</span> {{ rState.closingTime }}</p>
					<p v-else-if="rState.openingState === 'Closed'"><span class="text-red-500 font-bold">Closed</span> {{ rState.openingTime }}</p>
					<p v-else-if="rState.openingState === 'ClosingSoon'"><span class="text-red-500 font-bold">Closes</span> {{rState.closingTime }}</p>
					<p v-else-if="rState.openingState === 'OpeningSoon'"><span class="text-emerald-600 font-bold">Opens</span> {{ rState.openingTime }}</p>
				</div>
				<!-- TODO: Show the top rated review -->
				<span v-if="topRatedReview && topRatedReview.length > 0" class="item-description">
					<!-- NOTE: Need inline -->
					<router-link class="mr-1 inline hover:underline" to="/">
						<LucideIcon class="inline hover:stroke-[3px]" name="MessageSquare" color="#1b1b1b" :size="14"  />
					</router-link>
					<p class="inline">{{ `${topRatedReview.slice(0, 305)}...` }}</p>
					<router-link class="ml-1 inline hover:underline" to="/">more</router-link>
				</span>
			</div>
		</div>
		<div class="flex gap-2 text-sm font-semibold">
			<!-- TODO: Create Tags for the search item -->
			<span class="px-[6px] bg-[#1b1b1b] text-white rounded-full cursor-pointer hover:bg-[#303030] hover:shadow-md transition-all">Foods</span>
			<span class="px-[6px] bg-[#1b1b1b] text-white rounded-full cursor-pointer hover:bg-[#303030] hover:shadow-md transition-all">Burger</span>
			<span class="px-[6px] bg-[#1b1b1b] text-white rounded-full cursor-pointer hover:bg-[#303030] hover:shadow-md transition-all">Close to you</span>
			<span class="px-[6px] bg-[#1b1b1b] text-white rounded-full cursor-pointer hover:bg-[#303030] hover:shadow-md transition-all">Traditional</span>
			<span class="px-[6px] bg-[#1b1b1b] text-white rounded-full cursor-pointer hover:bg-[#303030] hover:shadow-md transition-all">Pets Allowed</span>
		</div>  
	</div>  
</template>

<script lang="ts" setup>
import { type BusinessOpenState } from '@/types';

const { getTimeValue } = myTime();

const props = withDefaults(defineProps<{
	photo: string,
	rName: string,
	stars: number,
	reviews: number,
	typeOfBusiness: string,
	cityOfOrigin: string,
	timeOpen: string,
	timeClosing: string,
	timeOpenValue?: number,
	timeClosingValue?: number,
	timeNow: string,
	topRatedReview?: string,
	tags?: string[],
}>(), {
	photo: '',
	rName: '',
	stars: 0,
	reviews: 0,
	typeOfBusiness: '',
	cityOfOrigin: '',
	timeOpen: '00:00',
	timeClosing: '00:00',
	timeOpenValue: 0,
	timeClosingValue: 0,
	timeNow: '00:00',
	topRatedReview: '',
	tags: () => [],
});

// TODO: Also add on what day it will it be open eg: Closed until 10:00 AM Tomorrow/On Monday
const rState = computed<BusinessOpenState>(() => {
	const timeNow = getTimeValue(props.timeNow);
	const openTime = getTimeValue(props.timeOpen);
	const closeTime = getTimeValue(props.timeClosing);

	if ( timeNow < closeTime && timeNow > openTime ) {
		const differenceInMinutes = closeTime - timeNow;
		if ( differenceInMinutes >= 60 ) 
			return { openingState: 'Open', closingTime: `until ${props.timeClosing}` };
		else 
			return { openingState: 'ClosingSoon', closingTime: `in ${openTime - timeNow} mins` };
	} else if ( timeNow < closeTime && timeNow < openTime ) {
		const differenceInMinutes = openTime - timeNow ;
		if ( differenceInMinutes >= 60 ) 
			return { openingState: 'Closed', openingTime: `until ${props.timeOpen}` };
		else 
			return { openingState: 'OpeningSoon', openingTime: `in ${differenceInMinutes} mins` };
	}  
	return { openingState: 'Open', closingTime: 'Open' };
})

</script>

<style scoped>
.search-item {
    @apply w-fit pb-3 flex flex-col gap-3 border-b-4 border-b-[#1b1b1b] bg-inherit
}

.search-item img {
    @apply 	w-full h-full rounded-2xl object-cover object-center overflow-hidden transition-all duration-500 ease-in-out
			hover:scale-110 
}

.item-description {
    @apply h-fit max-h-[7.65rem] w-[17rem] 
}
</style>