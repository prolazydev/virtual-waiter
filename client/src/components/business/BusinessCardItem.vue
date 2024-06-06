<template>
	<div class="w-fit p-3 flex flex-col border-2 border-[#1b1b1b] ">
			<div class="relative">
				<router-link :to="{ path: `/business/${business._id}` }">
					<div class="w-72 h-48 flex items-center ">
						<img v-if="business.coverImage" src="" alt="">
						<LucideIcon v-else class="m-auto opacity-50" name="ChefHat" :size="64" :stroke-width="2" />
					</div>
				</router-link>
				<!-- TODO: add to favorite businesses -->
				<button @click="() => console.log('blewh')" class="absolute top-0 right-0 m-2 z-50 transition-all" type="button" >
					<LucideIcon class="fill-transparent hover:fill-rose-500 hover:text-rose-500 transition-all" name="Heart" :stroke-width="2" />
				</button>
			</div>

			<div class="w-full mb-2 border-b-4 border-[#1b1b1b]"></div>
			
			<div class="flex flex-col gap-3">
				<div class="flex flex-col gap-3">
					<router-link :to="{ path: `/business/${business._id}` }" class="hover:underline">
						<h1 class="text-2xl font-semibold text-[#1b1b1b]">{{ business.name }}</h1>
					</router-link>
					<Review v-if="business.reviews && business.reviews > 0" :stars="business.averageRating!" :rating="business.reviews" />


					<div class="flex gap-2 text-sm font-semibold">
						<div v-for="(category, index) in business.categories" :key="index" class="px-[6px] py-[0.75px] bg-[#1b1b1b] text-white rounded-full cursor-pointer hover:bg-[#303030] hover:shadow-md transition-all">
							{{ category }}
						</div>
					</div>  
				</div>
	
				<div class="w-full border-b-2 border-[#1b1b1b]"></div>

				<div class="flex gap-2 items-center text-gray-600">
					<Tooltip text="45,254 clicks this week" _class="w-28 mb-1 text-center overflow-visible delay-300">
						<span class="flex gap-2 items-center">45,254 <LucideIcon name="Eye" :size="20" /></span>
					</Tooltip>

					<span class="w-1 h-1 rounded-full bg-gray-600"></span>

					<Tooltip text="5,000 reservations" _class="w-28 mb-1 text-center overflow-visible delay-300">
						<span class="flex gap-2 items-center">5,000 <LucideIcon name="UserRound" :size="20" /></span>
					</Tooltip>
				</div>
			</div>
		</div>
</template>

<script lang="ts" setup>
import type { Business } from '@/types/business';

defineProps<{
	business: Business
}>();
</script>

<style scoped>

</style>