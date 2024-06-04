<template>
	<div class="flex gap-10 w-full">
		<div class="main-dashboard">
			<div class="sidenav">
				<div class="flex flex-col gap-3">
					<h1 class="text-2xl font-semibold">Dashboard</h1>
					<hr class="border-b border-b-[#1b1b1b]/50">
				</div>

				<div class="flex flex-col gap-3">
					<button v-for="(item, index) in dashboardTabs" :key="index" @click="tab = item.name" class="dashboard-link" :class="{ 'active-tab': tab === item.name }">
						<LucideIcon :name="item.icon" :size="22" />
						{{ item.name }}
					</button>
					<!-- <button @click="() => tabs = 'manager'" class="dashboard-link" :class="{ 'active-tab': tabs === 'manager' }"><LucideIcon name="LayoutDashboard" :size="22"/>Home</button>
					<button @click="() => tabs = 'business'"  class="dashboard-link" :class="{ 'active-tab': tabs === 'business' }"><LucideIcon name="ChefHat" :size="22"/>Business</button> -->
					<!-- <button class="dashboard-link">Business</button> -->
				</div>
			</div>
		</div>
		<!-- TODO: Implement dynamic component rendering on runtime to switch between the dashboard tabs -->
		<!-- <router-link class="w-fit bg-[#1b1b1b] text-white font-semibold border-2 border-[#1b1b1b] active:border-b-white transition-all" to="/">Manager</router-link>-->
		<!-- <BusinessCardItem v-for="business in businesses" :key="business._id" :business="business" />  -->

		<div class="w-full">
			<component :is="componentRenderer" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { BusinessDashboardTab } from '@/types/business';

const { user, setTab } = useUserStore();

const tab = ref<string>(user.lastTab || 'Home');

const dashboardTabs: BusinessDashboardTab[] = [
	{ 
		name: 'Home',
		icon: 'LayoutDashboard'
	},
	{
		name: 'Business',
		icon: 'ChefHat'
	}
];

watch(tab, (newTab) => setTab(newTab))

const componentRenderer = computed( () => {
	if (tab.value === 'Home') 
		return defineAsyncComponent(() => import('@/components/business/dashboard/BusinessDashboardHome.vue'));
	else if (tab.value === 'Business') 
		return defineAsyncComponent(() => import('@/components/business/dashboard/BusinessDashboardBusiness.vue'));
	
	return false;
})


</script>

<style scoped>
.main-dashboard {
	@apply flex
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

.router-link-exact-activ, .active-tab {
	@apply font-semibold stroke-2
}
</style>