<template>
	<div class="w-fit p-3 flex flex-col border-2 border-[#1b1b1b] ">
		<div class="relative">
			<router-link :to="{ path: `/business/${business._id}` }">
				<div class="w-72 h-48 pb-2 flex items-start">
					<img 
                    v-if="business.coverImage" 
                        :src="business.coverImage" 
                        alt="Business Cover Image"
                        class="w-full h-full object-cover"
                    />
					<LucideIcon 
                        v-else 
                        name="ChefHat" 
                        :size="64" 
                        :stroke-width="2" 
                        class="m-auto opacity-50" 
                    />
				</div>
			</router-link>
			<div 
                class="top-links"
                :class="shouldUseWhiteText(business.coverImage ?? '') ? 'light-text' : 'dark-text'"
            >
                <!-- TODO: shouldUseWhiteText() -->
                <router-link :to="{ name: 'business-settings', params: { id: business._id } }" class="absolute top-0 left-0 m-2 z-50 transition-all"  type="button">
                    <LucideIcon class="fill-transparent hover:rotate-90 transition-all duration-300" name="Settings" :stroke-width="2" />
                </router-link>

                <!-- TODO: add to favorite businesses -->
                <button @click="() => console.log('blewh')" class="absolute top-0 right-0 m-2 z-50 transition-all" type="button">
                    <LucideIcon class="fill-transparent hover:fill-rose-500 hover:text-rose-500 transition-all" name="Heart" :stroke-width="2" />
                </button>
            </div>
		</div>

		<div class="w-full mb-2 border-b-4 border-[#1b1b1b]"></div>
		
		<div class="flex flex-col gap-3">
			<div class="flex flex-col gap-3">
				<router-link :to="{ path: `/business/${business._id}` }" class="hover:underline">
					<h1 class="text-2xl font-semibold text-[#1b1b1b]">{{ business.username }}</h1>
				</router-link>
				<Review :stars="business.averageRating!" :rating="business.reviews" />

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
import type { Business } from '@/types/models/business';

const { shouldUseWhiteText } = myMisc();

defineProps<{
	business: Business
}>();
</script>

<style scoped>
.top-links > button, .top-links > a {
    @apply drop-shadow hover:drop-shadow-none
}

.dark-text > button, .dark-text > a {
    @apply text-[#1b1b1b]  drop-shadow hover:drop-shadow-none
}

.light-text > button, .light-text > a {
    @apply text-white drop-shadow hover:drop-shadow-none
}
</style>