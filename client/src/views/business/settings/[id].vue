<template>
	<div class="page-main dashboard">
		<div class="flex gap-10 w-full">
			<div class="sidenav">
				<div class="flex flex-col gap-3">
					<!-- TODO: figure out the naming -->
					<div class="flex flex-col gap-1">
						<h1 class="text-2xl font-semibold text-nowrap">Business Settings</h1>
						<p class="text-xs">Id: {{ params.id }}</p>
					</div>

					<hr class="border-b border-b-[#1b1b1b]/50">
				</div>

				<div class="flex flex-col gap-3">
					<button v-for="(item, index) in tabs" :key="index" @click="tab = item.name" class="dashboard-link" :class="{ 'active-tab': tab === item.name }">
						<LucideIcon :name="item.icon" :size="22" />
						{{ item.name }}
					</button>
				</div>
			</div>
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
import type { BusinessSettingsTab, BusinessSettingsTabTitles } from '@/types/business';

const loader = useLoader();

const { params } = useRoute('/business/settings/[id]');

const { user, setTab } = useUserStore();

const tab = ref<BusinessSettingsTabTitles>(user.lastBusinessSettingsTab || 'General');

const tabs: BusinessSettingsTab[] = [
	{
		name: 'General',
		icon: 'Settings'
	},
	{
		name: 'Access',
		icon: 'Lock'
	},
	{
		name: 'Notifications',
		icon: 'Bell'
	},
	{
		name: 'Account',
		icon: 'User'
	}
	
];

const componentRenderer = computed(() => {
	try {
		loader.startLoader();
		switch (tab.value) {
			case 'General':
				return defineAsyncComponent(() => import('@/components/business/settings/tabs/BusinessEditBasicDataTab.vue'));
			case 'Access':
				return defineAsyncComponent(() => import('@/components/business/settings/tabs/BusinessEditAccessControlTab.vue'));
		
			default:
				return defineAsyncComponent(() => import('@/components/business/settings/tabs/BusinessEditBasicDataTab.vue'));
		}
	} finally {
		loader.finishLoader();
	}
});

</script>

<style scoped>
.dashboard {
	@apply py-4 flex flex-col gap-20
}

.sidenav {
	@apply 	min-w-64 w-64 flex flex-col gap-3 border-2 border-[#1b1b1b] p-5
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