<template>
	<div class="page-main dashboard">
		<div class="flex gap-10 w-full">
			<div class="sidenav">
				<div class="flex flex-col gap-3">
					<div class="flex flex-col gap-1">
						<h1 class="text-2xl font-semibold text-nowrap">Business Settings</h1>
						<p class="text-xs">Id: {{ params.id }}</p>
					</div>

					<hr class="border-b border-b-[#1b1b1b]/50">
				</div>

				<div class="flex flex-col gap-3">
					<button 
                        v-for="(tab) in businessSettingsTabs" 
                        :key="tab.name" 
                        @click="userSettingTab = tab.name" 
                        :class="{ 'active-tab': userSettingTab === tab.name }"
                        class="dashboard-link" 
                    >
						<LucideIcon 
                            :name="tab.icon" 
                            :size="22" 
                        />
						{{ tab.name }}
					</button>
				</div>
			</div>
            <Suspense :timeout="0">
                <template #default>
                    <component 
                        :is="componentRenderer" 
                        :userSettingTab="userSettingTab" 
                        :businessDisplayName="businessDisplayName" 
                    />
                </template>

                <template #fallback>
                    <Loading />
                </template>
            </Suspense>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { definePage } from 'unplugin-vue-router/runtime';

import type { BusinessSettingsTabTitles } from '@/types/models/business';
import { businessSettingsTabs } from '@/constants/business/settings/tabs';

definePage({
    meta: {
        title: 'Dashboard',
        auth: true,
    },
    name: 'business-dashboard-settings',
});

const { params } = useRoute('business-dashboard-settings');
const router = useRouter();

const loader = useLoader();
const { user, setTab } = useUserStore();

const userSettingTab = ref<BusinessSettingsTabTitles>(user.lastBusinessSettingsTab || 'General');

watch(userSettingTab, (newTab) => setTab('lastBusinessSettingsTab', newTab));

const businessDisplayName = ref<string>('');

const componentRenderer = computed(() => {
	try {
		loader.startLoader();
		switch (userSettingTab.value) {
			case 'General':
				return defineAsyncComponent(() => import('@/components/business/settings/tabs/BusinessSettingsGeneralTab.vue'));
			case 'Access & Roles':
				return defineAsyncComponent(() => import('@/components/business/settings/tabs/BusinessSettingsAccessTab.vue'));
			default:
				return defineAsyncComponent(() => import('@/components/business/settings/tabs/BusinessSettingsGeneralTab.vue'));
		}
	} catch (error) {
        console.error(error);
    } finally {
		loader.finishLoader();
	}
});

const getBusinessDisplayName = async () => {
    try {
        const { getBusinessDisplayNameById } = businessService();

        const { response, statusCode, data } = await getBusinessDisplayNameById(params.id)

        if (response.value!.ok && data.value) 
            businessDisplayName.value = data.value.displayName;

        switch (statusCode.value) {
            case 404:
                return await router.push({ name: 'not-found' });
            case 400:
                return await router.push({ name: '/error/bad-request' });
            // Add additional cases as needed
            default:
                return // Handle other status codes if necessary
        }
    } catch (error) {
        console.error(error);
    }
}
getBusinessDisplayName();
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

.router-link-exact-active, .active-tab, .active-tab > svg {
	@apply font-semibold stroke-2
}

</style>