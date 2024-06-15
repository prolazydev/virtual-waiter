<template>
	<div class="page-main dashboard">
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
			<Transition mode="out-in">
				<Suspense :timeout="0">
					<template #default>
						<component :is="componentRenderer" />
					</template>
					<template #fallback>
						<Loading />
					</template>
				</Suspense>
			</Transition>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { BusinessDashboardTab, BusinessDashboardTabTitles } from '@/types/business';

const { user, setTab } = useUserStore();
const loader = useLoader();

const tab = ref<BusinessDashboardTabTitles>(user.lastTab || 'Home');

const dashboardTabs: BusinessDashboardTab[] = [
	{ 
		name: 'Home',
		icon: 'LayoutDashboard'
	},
	{
		name: 'Business',
		icon: 'ChefHat'
	},
	{
		name: 'Conversations',
		icon: 'MessageCircle',
	},
	{
		name: 'Orders',
		icon: 'ShoppingCart'
	},
	{
		name: 'Products',
		icon: 'Box'
	},
	{
		name: 'Reports',
		icon: 'BarChart'
	},
	{
		name: 'Settings',
		icon: 'Settings'
	},
];

watch(tab, (newTab) => setTab(newTab))

const componentRenderer = computed(() => {
	try {
		loader.startLoader();
		switch (tab.value) {
			case 'Home':
				return defineAsyncComponent(() => import('@/components/business/dashboard/tabs/BusinessDashboardHomeTab.vue'));
			case 'Business':
				return defineAsyncComponent(() => import('@/components/business/dashboard/tabs/BusinessDashboardBusinessTab.vue'));
			// TODO: Implement the rest of the dashboard tabs 
			// case 'Conversations':
			// 	return defineAsyncComponent(() => import('@/components/business/dashboard/BusinessDashboardConversations.vue'));
			// case 'Orders':
			// 	return defineAsyncComponent(() => import('@/components/business/dashboard/BusinessDashboardOrders.vue'));
			// case 'Products':
			// 	return defineAsyncComponent(() => import('@/components/business/dashboard/BusinessDashboardProducts.vue'));
			// case 'Reports':
			// 	return defineAsyncComponent(() => import('@/components/business/dashboard/BusinessDashboardReports.vue'));
			// case 'Settings':
			// 	return defineAsyncComponent(() => import('@/components/business/dashboard/BusinessDashboardSettings.vue'));
			default:
				return defineAsyncComponent(() => import('@/components/business/dashboard/tabs/BusinessDashboardHomeTab.vue'));
		}
	} finally {
		loader.finishLoader();
	}
})


</script>

<style scoped>
.dashboard {
	@apply py-4 flex flex-col gap-20
}

.main-dashboard {
	@apply flex
}

.sidenav {
	@apply 	w-64 flex flex-col gap-3 border-2 border-[#1b1b1b] p-5
			sticky top-[6.4375rem] self-start
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