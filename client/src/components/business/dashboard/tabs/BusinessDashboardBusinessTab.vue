<template>
    <!-- NOTE: v-once for better performance since we don't do any dynamic rerendering here -->
	<div v-if="businesses.length > 0" v-once class="w-full m flex flex-col gap-5">
		<div class="flex flex-col gap-2">
			<h2 class="text-2xl font-semibold">Your Businesses</h2>

			<div class="flex justify-between">
				<form @submit.prevent="handleSearch">
					<input class="w-64 px-2 py-1 border-2 border-[#1b1b1b] outline-none focus:border-b-rose-600 transition-colors" type="text" placeholder="Search" />
				</form>
				<MyButton style-type="full" color="inverted-primary" size="sm">
					<router-link to="/business/create">Create your Business</router-link>
				</MyButton>
				<!-- <router-link to="/business/create" class="px-2 py-1 text-white border-2 border-[#1b1b1b] bg-[#1b1b1b] active:border-b-white">Create your Business</router-link> -->
			</div>
		</div>
		<div class="favorite-businesses">
			<!-- TODO: Limit's to at most 4, maybe create a touch slider? But that may be overkill -->
			<div v-for="business in favoriteBusinesses" :key="business._id" class="favorite-business-card">
				<router-link :to="{ path: `/business/${business._id}` }" class="overflow-hidden">
					<div class="favorite-business-image">
						<img 
                            v-if="business.coverImage" 
                            :src="business.coverImage" 
                            alt="Business Cover Image"
                            class="cover-image"
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
					<router-link 
						:to="{ name: 'business-dashboard-settings', params: { id: business._id } }" 
						class="absolute top-0 left-0 m-2 z-50 transition-all" 
						type="button"
					>
						<LucideIcon 
							class="fill-transparent drop-shadow-md hover:rotate-90 transition-all duration-300" 
							name="Settings" 
							:stroke-width="2" 
						/>
					</router-link>
                 
					<button 
						@click="() => console.log('blewh')" 
						class="absolute top-0 right-0 m-2 z-50 transition-all" 
						type="button"
					>
                        <LucideIcon 
							class="fill-transparent drop-shadow-md hover:fill-rose-500 hover:text-rose-500 transition-all" 
							name="Heart" 
							:stroke-width="2" 
						/>
                    </button>
                </div>
                <h1 
                    v-if="business.coverImage" 
                    :class="shouldUseWhiteText(business.coverImage ?? '') ? 'text-white' : 'text-[#1b1b1b]'"
                    class="favorite-business-name" 
                >
                    {{ business.displayName }}
                </h1>
                <h1 
                    v-else
                    class="favorite-business-name text-[#1b1b1b]" 
                >
                    {{ business.displayName }}
                </h1>
			</div>
		</div>
		<div class="business-cards">
			<BusinessCardItem v-for="business in businesses" :key="business._id" :business="business" /> 
		</div>
	</div>

	<div v-else class="m-auto">
		<router-link to="/business/create" title="Create your Business">
			<LucideIcon class="text-gray-400 hover:text-[#1b1b1b] cursor-pointer transition-colors" name="CirclePlus" :size="148" />
		</router-link>
	</div>
</template>

<script lang="ts" setup>
import { type Business } from '@/types/models/business';

const router = useRouter();

const { shouldUseWhiteText } = myMisc();

const businesses = ref<Business[]>([]);
const favoriteBusinesses = ref<Business[]>([]);

const getBusinesses = async () => {
	const { getAllOwnedBusinesses } = businessService();
	try {
		const { response, statusCode, data } = await getAllOwnedBusinesses();

		if (response.value!.ok && data.value) {
			businesses.value = data.value;
			// TODO: Actually take the favorite businesses
			favoriteBusinesses.value = businesses.value;
		}

		// TODO: handle error
		switch (statusCode.value) {
			case 400:
				return await router.push({ name: '/error/bad-request' });
			case 401:
				// TODO: create bad request page
				return await router.push({ name: '/error/bad-request' });
			// Add additional cases as needed
			default:
				return // Handle other status codes if necessary
		}
	} catch (error) {
		console.error(error);
	}
};
await getBusinesses();

const handleSearch = (e: Event) => {
	console.log('searching...');
}
</script>

<style scoped>
.favorite-businesses {
	@apply flex flex-wrap gap-5 items-center 
}

.favorite-business-card {
	@apply 	w-fit flex flex-col border-2 border-b-4 border-[#1b1b1b] relative transition-colors
			active:border-b-rose-600 
}

.favorite-business-image {
	@apply 	w-[312px] h-32 flex items-center
			transition-all duration-500
			filter blur-sm scale-[1.1]
}
.favorite-business-card:hover .favorite-business-image {
	@apply filter-none scale-100
}
.favorite-business-card:hover .favorite-business-name {
	@apply top-[85%] drop-shadow-none
}

.favorite-business-name {
	@apply 	w-[70%] text-center text-2xl font-semibold drop-shadow 
			absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
			transition-all duration-500
			pointer-events-none
}

.business-cards {
	@apply flex flex-wrap gap-5 items-center
}

.cover-image {
    @apply w-full h-full object-cover 
}

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