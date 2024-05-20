<template>
	<div v-if="businesses.length > 0" class="flex flex-col gap-5">
		<div class="main-dashboard flex">
			<div class="sidenav ">
				<div class="flex flex-col gap-3">
					<h1 class="text-2xl font-semibold">Dashboard</h1>
					<hr class="border-b border-b-[#1b1b1b]/50">
				</div>

				<div class="flex flex-col gap-3">
					<router-link class="dashboard-link" to="/dashboard"><LucideIcon name="LayoutDashboard" :size="22" :stroke-width="1.5" />Home</router-link>
					<router-link class="dashboard-link" to="/"><LucideIcon name="ChefHat" :size="22" :stroke-width="1.5" />Business</router-link>
					<router-link class="dashboard-link" to="/business">Business</router-link>

				</div>
			</div>
		</div>
		<!-- TODO: Implement dynamic component rendering on runtime to switch between the dashboard tabs -->
		<!-- <router-link class="w-fit bg-[#1b1b1b] text-white font-semibold border-2 border-[#1b1b1b] active:border-b-white transition-all" to="/">Manager</router-link>-->
		
		<!-- <BusinessCardItem v-for="business in businesses" :key="business._id" :business="business" />  -->
	</div>

	<div v-else class="mx-auto">
		<router-link to="/create_business" title="Create your Business">
			<LucideIcon class="text-gray-400 hover:text-[#1b1b1b] cursor-pointer transition-colors" name="CirclePlus" :size="148" />
		</router-link>
	</div>
</template>

<script lang="ts" setup>
import { type Business } from '@/types/business';
import BusinessCardItem from '@/views/business/businessDashboard/BusinessCardItem.vue';

const businesses = ref<Business[]>([]);

const getBusinesses = async () => {
	const { response, data } = await myFetch<Business[]>('business_self');
	if (response.value!.ok && data.value) {
		businesses.value = data.value;
	}
}

await getBusinesses();

</script>

<style scoped>
.main-dashboard {
	@apply px-32
}

.sidenav {
	@apply 	w-64 flex flex-col gap-3 border-2 border-[#1b1b1b] p-5

			sticky top-[6.75rem] self-start
	;
}

.dashboard-link {
	@apply 	flex gap-1 items-center text-[#1b1b1b] 
			text-xl cursor-pointer
			hover:text-[#303030] transition-colors
}

.router-link-exact-active {
	@apply font-semibold
}
</style>