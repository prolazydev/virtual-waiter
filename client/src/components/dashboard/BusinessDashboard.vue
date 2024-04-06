<template>
	<div v-if="response && response.ok && data && data?.length > 0">
		{{ data }}
	</div>

	<div v-else class="mx-auto">
		<router-link to="/create_business" title="Create your Business">
			<LucideIcon class="text-gray-400 hover:text-[#1b1b1b] cursor-pointer transition-colors" name="PlusCircle" :size="148" />
		</router-link>
	</div>
</template>

<script lang="ts" setup>
import { type BusinessItem } from '@/types/business';
 
const { response, data } = await myFetch<BusinessItem[]>('business/self');

console.log(response, data.value);

</script>

<style scoped>

</style>