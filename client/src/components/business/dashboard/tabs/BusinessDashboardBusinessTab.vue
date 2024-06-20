<template>
	<div v-if="businesses.length > 0" class="w-full flex flex-col gap-5">
		<div class="flex justify-between">
			<form @submit.prevent="handleSearch">
				<input class="px-2 py-1 border-2 border-[#1b1b1b] outline-none focus:border-b-rose-600 transition-colors" type="text" placeholder="Search" />
			</form>
			<router-link to="/business/create" class="px-2 py-1 text-white border-2 border-[#1b1b1b] bg-[#1b1b1b] active:border-b-white">Create your Business</router-link>
		</div>
		<div class="favorite-businesses">
			<!-- TODO: Needs to be at most 4 favorites -->
			<div v-for="business, in favoriteBusinesses" :key="business._id" v-once class="favorite-business-card">
				<router-link :to="{ path: `/business/${business._id}` }">
					<div class="favorite-business-image">
						<img v-if="business.coverImage" src="" alt="">
						<LucideIcon v-else class="m-auto opacity-50" name="ChefHat" :size="64" :stroke-width="2" />
					</div>
				</router-link>
				<button @click="() => console.log('blewh')" class="absolute top-0 right-0 m-2 z-50 transition-all" type="button" >
					<LucideIcon class="fill-transparent hover:fill-rose-500 hover:text-rose-500 transition-all" name="Heart" :stroke-width="2" />
				</button>

				<router-link :to="{ name: '/business/settings/[id]', params: { id: business._id } }" class="absolute top-0 left-0 m-2 z-50 transition-all"  type="button">
					<LucideIcon class="fill-transparent hover:rotate-90 transition-all duration-300" name="Settings" :stroke-width="2" />
				</router-link>

				<h1 class="favorite-business-name">{{ business.name }}</h1>
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
import { type Business } from '@/types/business';

const router = useRouter();

const businesses = ref<Business[]>([]);
const favoriteBusinesses = ref<Business[]>([]);

const getBusinesses = async () => {
	const { getBusinessesSelf } = businessService();
	try {
		const { response, statusCode, data } = await getBusinessesSelf();

		if (response.value!.ok && data.value) {
			businesses.value = data.value;
			
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
	@apply w-fit flex flex-col border-2 border-[#1b1b1b] relative
}

.favorite-business-image {
	@apply 	w-[312px] h-32 flex items-center 
			transition-all duration-500
			filter blur-sm
}
.favorite-business-card:hover .favorite-business-image {
	@apply filter-none scale-110
}
.favorite-business-card:hover .favorite-business-name {
	@apply top-28
}

.favorite-business-name {
	@apply 	text-2xl font-semibold text-[#1b1b1b] drop-shadow 
			absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
			transition-all duration-500
			pointer-events-none
}

.business-cards {
	@apply flex flex-wrap gap-5 items-center
}
</style>