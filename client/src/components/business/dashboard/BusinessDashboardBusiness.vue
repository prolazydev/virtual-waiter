<template>
	<div v-if="businesses.length > 0" class="business-cards">
		<BusinessCardItem v-for="business in businesses" :key="business._id" :business="business" /> 
		
		<router-link to="/create_business" title="Create your Business">
			<LucideIcon class="text-gray-400 hover:text-[#1b1b1b] cursor-pointer transition-colors" name="CirclePlus" :size="148" />
		</router-link>
	</div>

	<div v-else class="mx-auto">
		<router-link to="/create_business" title="Create your Business">
			<LucideIcon class="text-gray-400 hover:text-[#1b1b1b] cursor-pointer transition-colors" name="CirclePlus" :size="148" />
		</router-link>
	</div>
</template>

<script lang="ts" setup>
import { type Business } from '@/types/business';

const businesses = ref<Business[]>([]);

const getBusinesses = async () => {
	const { response, data } = await myFetch<Business[]>('business_self');
	// TODO: handle error
	if (response.value!.ok && data.value) 
		businesses.value = data.value;
}

await getBusinesses();


</script>

<style scoped>
.business-cards {
	@apply flex flex-wrap gap-5 justify-center items-center
}
</style>