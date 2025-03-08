<template>
	<div class="page-main dashboard">
		<div class="flex gap-10 w-full">
			<div class="main-dashboard">
				<div class="sidenav-main">
					<Breadcrumb :node="dashboardNode" class="breadcrumb-main" />
					<div class="sidenav">
						<div class="flex flex-col gap-3">
							<h1 class="text-2xl font-semibold">Dashboard</h1>
							<hr class="border-b border-b-[#1b1b1b]/50">
						</div>

						<div class="flex flex-col gap-3">
							<button 
								v-for="(item, index) in tabs" :key="index" 
								@click="tab = item.name" 
								:class="{ 'active-tab': tab === item.name }"
								class="dashboard-link" 
							>
								<LucideIcon 
									:name="item.icon" 
									:size="22" 
								/>
								{{ item.name }}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full flex flex-col gap-3">
				<div v-if="isLoading">
					loading...
				</div>
				<div v-else>
					<div class="w-fit pt-4 relative">
						<button type="button" class="dropdown-btn w-32 border-b-2 border-[#1b1b1b] font-semibold" id="selectedBusinessDropdownBtn" aria-haspopup="menu">
							{{ businessStore.selectedBusiness === 'All' ? businessStore.selectedBusiness : businesses.find(b => b.username === businessStore.selectedBusiness)?.displayName }}
							<LucideIcon name="Play" class="fill-current stroke-[#1b1b1b] rotate-90 transition-all duration-300" size="12"/>
						</button>
						<ul class="dropdown-content top-1 p-2 z-10">
							<li
								@click="businessStore.selectedBusiness = 'All'"
								:class="{ 'font-semibold': businessStore.selectedBusiness === 'All' }"
							>
								All
							</li>
							<li 
								v-for="(item) in businesses" :key="item.username"
								@click="businessStore.selectedBusiness = item.username"
								:class="{ 'font-semibold': businessStore.selectedBusiness === item.username }"
							>
								{{ item.displayName }}
							</li>
						</ul>
					</div>
				</div>
				<Suspense 
					:timeout="5000" 
					:key="`suspense-${tab}`"
				>
					<template #default>
						<component 
							:is="componentTab" 
							:key="tab" 
							class="min-h-[30rem]"
						/>
					</template>
					<template #fallback>
						<!-- NOTE: Height of all heights, margins and paddings for header, footer and body -->
						<Loading :style="{
							'height': 'calc(100vh - 264px - 57px - 69px - 35px)',
						}" />
					</template>
				</Suspense>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { definePage } from 'unplugin-vue-router/runtime';
import type { Business, BusinessDashboardTabTitles } from '@/types/models/business';

import { tabs } from '@/constants/business/dashboard';
import type { BreadcrumbNode } from '@/types/common';

definePage({
    meta: {
        title: 'Dashboard',
        auth: true,
    },
    name: 'business-dashboard',
});

const { user, setTab } = useUserStore();
const businessStore = useBusinessStore();
const { addQueryParam } = useWebUtils();
const loader = useLoader();

const isLoading = ref(false);;

const businesses = ref<Business[]>([]);
const tab = ref<BusinessDashboardTabTitles>(initTab());
addQueryParam('t', tab.value);

const dashboardNode = ref<BreadcrumbNode>({ 
	title: 'Dashboard', 
	link: 'business-dashboard', 
	node: { title: tab.value, } 
});

watch(tab, (newTab) => {
	setTab('lastBusinessDashboardTab', newTab);

	dashboardNode.value = {
		title: 'Dashboard',
		link: 'business-dashboard',
		node: { title: newTab },
	}

	addQueryParam('t', newTab);
})

const componentTab = computed(() => {
	try {
		loader.startLoader();
		switch (tab.value.toLowerCase()) {
			case 'home':
				return defineAsyncComponent(() => import('@/components/business/dashboard/tabs/BusinessDashboardHomeTab.vue'));
			case 'business':
				return defineAsyncComponent(() => import('@/components/business/dashboard/tabs/BusinessDashboardBusinessTab.vue'));
			// case 'Conversations':
			// 	return defineAsyncComponent(() => import('@/components/business/dashboard/BusinessDashboardConversations.vue'));
			// case 'Orders':
			// 	return defineAsyncComponent(() => import('@/components/business/dashboard/BusinessDashboardOrders.vue'));
			case 'products':
				return defineAsyncComponent(() => import('@/components/business/dashboard/tabs/BusinessDashboardProductsTab.vue'));
			// case 'Reports':
			// 	return defineAsyncComponent(() => import('@/components/business/dashboard/BusinessDashboardReports.vue'));
			// case 'Settings':
			// 	return defineAsyncComponent(() => import('@/components/business/dashboard/BusinessDashboardSettings.vue'));
			default:
				return defineAsyncComponent(() => import('@/components/business/dashboard/tabs/BusinessDashboardHomeTab.vue'));
		}
        
	} catch (error) {
        console.error(error);
    } finally {
		loader.finishLoader();
	}
});

function initTab() {
	const router = useRouter();
	// get t param if exists
	const tabParam = router.currentRoute.value.query.t as BusinessDashboardTabTitles;
	if (tabParam) {
		return tabParam;
	} else {
		return user.lastBusinessDashboardTab ?? 'home';
	}
}

const getAllBusinessesByOwner = async () => {
	isLoading.value = true;
	try {
		const { getAllOwnedBusinesses } = businessService();
		const { response, data } = await getAllOwnedBusinesses(['_id', 'displayName', 'username', ]);

		if (response.value?.ok && data.value) {
			businesses.value = data.value;
		} else {
			useTost('Error! Failed to get businesses');
		}
	} catch (error) {
		console.error(error);
	} finally {
		isLoading.value = false;
	}
}

getAllBusinessesByOwner();
</script>

<style scoped>
/* TODO: Make a reusable css component since it's used 2 times exactly on business dashboard and settings */
.breadcrumb-main *>::first-letter {
	@apply capitalize
}

.dashboard {
	@apply pt-1 pb-6 flex flex-col gap-20
}

.main-dashboard {
	@apply flex flex-col gap-3
}

.sidenav-main {
	@apply 	w-64 min-w-64 flex flex-col gap-1
			sticky top-20 self-start
	;
}

.sidenav {
	@apply flex flex-col gap-3 border-2 border-[#1b1b1b] p-5
	;
}

.dashboard-link {
	@apply 	flex gap-1 items-center text-[#1b1b1b] capitalize
			text-xl cursor-pointer
			hover:text-[#303030] transition-colors
}

.router-link-exact-activ, .active-tab, .active-tab > svg { 
	@apply font-semibold stroke-2
}

.dropdown-content {
    @apply  w-full mt-0 flex flex-col gap-1 text-start border-2 border-[#1b1b1b] bg-white opacity-0 transition-all 
            absolute top-12 shadow-lg
            pointer-events-none hover:pointer-events-auto hover:opacity-100  
}
.dropdown-content:hover > li {
    @apply opacity-100 pointer-events-auto;
}

.dropdown-content li {
    @apply  px-1 py-1 relative bg-white cursor-pointer opacity-0 transition-all z-10
            border-b-4 border-b-transparent 
            pointer-events-none
            hover:border-b-rose-600 
    ;
}

.dropdown-btn, .dropdown-btn-user {
    @apply px-1 flex gap-1 justify-between items-center cursor-pointer
    ;
}
.dropdown-btn:focus + .dropdown-content, .dropdown-btn-user:focus + .dropdown-content {
    @apply mt-2 border-black visible opacity-100;
} 
.dropdown-btn:focus > svg {
	@apply rotate-[270deg] 
	;
}
.dropdown-btn:focus + .dropdown-content li, .dropdown-btn-user:focus + .dropdown-content li {
    @apply opacity-100 pointer-events-auto;
}
</style>