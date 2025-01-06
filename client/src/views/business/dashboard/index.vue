<template>
	<div class="page-main dashboard">
		<div class="flex gap-10 w-full">
			<div class="main-dashboard">
				<div class="sidenav-main">
					<Breadcrumb :node="dashboardNode" />
					<div class="sidenav">
						<div class="flex flex-col gap-3">
							<h1 class="text-2xl font-semibold">Dashboard</h1>
							<hr class="border-b border-b-[#1b1b1b]/50">
						</div>

						<div class="flex flex-col gap-3">
							<button 
								v-for="(item, index) in tabs" 
								:key="index" @click="tab = item.name" 
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
            <!-- NOTE:  Needed out-in for the component to properly render because of the 
                        potential race conditions on the component rendering trying to render 
                        without the transition finishing 
            -->
			<!-- <Transition mode="in-out"> -->
				<Suspense :timeout="0">
					<template #default>
						<component 
							:is="componentTab" 
							:key="tab" 
							class="min-h-[30rem]"
						/>
					</template>
					<template #fallback>
						<Loading :style="defaultLoadingStyle" />
					</template>
				</Suspense>
			<!-- </Transition> -->
		</div>
	</div>
</template>

<script lang="ts" setup>
import { definePage } from 'unplugin-vue-router/runtime';

import type { BusinessDashboardTabTitles } from '@/types/models/business';
import { tabs } from '@/constants/business/dashboard';
import type { BreadcrumbNode } from '@/types/common';
import { defaultLoadingStyle } from '@/constants/common/style';

definePage({
    meta: {
        title: 'Dashboard',
        auth: true,
    },
    name: 'business-dashboard',
});

const { user, setTab } = useUserStore();
const loader = useLoader();

const tab = ref<BusinessDashboardTabTitles>(user.lastBusinessDashboardTab ?? 'Home');
const dashboardNode = ref<BreadcrumbNode>({ 
	title: 'Dashboard', 
	link: 'business-dashboard', 
	node: { title: tab.value, } 
});

watch(tab, (newTab) => {
	setTab('lastBusinessDashboardTab', newTab);

	dashboardNode.value.title = 'Dashboard';
	dashboardNode.value.link = 'business-dashboard';
	dashboardNode.value.node = { title: newTab };
})

const componentTab = computed(() => {
	try {
		loader.startLoader();
		switch (tab.value) {
			case 'Home':
				return defineAsyncComponent(() => import('@/components/business/dashboard/tabs/BusinessDashboardHomeTab.vue'));
			case 'Business':
				return defineAsyncComponent(() => import('@/components/business/dashboard/tabs/BusinessDashboardBusinessTab.vue'));
			// case 'Conversations':
			// 	return defineAsyncComponent(() => import('@/components/business/dashboard/BusinessDashboardConversations.vue'));
			// case 'Orders':
			// 	return defineAsyncComponent(() => import('@/components/business/dashboard/BusinessDashboardOrders.vue'));
			case 'Products':
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
		// loader.finishLoader();
	}
});
</script>

<style scoped>
/* TODO: Make a reusable css component since it's used 2 times exactly on business dashboard and settings */
.dashboard {
	@apply py-5 flex flex-col gap-20
}

.main-dashboard {
	@apply flex flex-col gap-3
}

.sidenav-main {
	@apply 	w-64 min-w-64 flex flex-col gap-1
			sticky top-[5.75rem] self-start
		;
}

.sidenav {
	@apply flex flex-col gap-3 border-2 border-[#1b1b1b] p-5
	;
}

.dashboard-link {
	@apply 	flex gap-1 items-center text-[#1b1b1b] 
			text-xl cursor-pointer
			hover:text-[#303030] transition-colors
}

.router-link-exact-activ, .active-tab, .active-tab > svg { 
	@apply font-semibold stroke-2
}
</style>