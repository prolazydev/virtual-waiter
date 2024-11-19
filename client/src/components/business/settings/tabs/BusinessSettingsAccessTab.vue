<template>
	<div class="w-full flex flex-col h-full">
        <section class="flex flex-col mx-auto">
			<h1 class="w-fit text-3xl font-bold text-[#1b1b1b] uppercase tracking-widest">
                {{ userSettingTab }} Settings for ...
                <!-- {{ business?.username }} -->
            </h1>
			<div class="h-1 w-4 mb-5 bg-[#1b1b1b]"></div>
        </section>

        <section class="max-w-screen-md">
            test
        </section>
	</div>
</template>

<script lang="ts" setup>
import type { BusinessSettingsTabTitles } from '@/types/models/business';
// import type { Business } from '@/types/models/business';

defineProps<{
    userSettingTab: BusinessSettingsTabTitles;
}>();


// const { params } = useRoute('/business/settings/[id]');
// const router = useRouter();

// const loader = useLoader();

// const business = ref<Business>({} as Business);

// const handleDataMapping = (data: Business) => {
// 	business.value = data;
//     loader.finishLoader();
// }

// const handleGetBusiness = async () => {
// 	try {
//         loader.startLoader();
// 	    const { getBusinessSelfById } = businessService();
// 		const { response, statusCode, data } = await getBusinessSelfById(params.id);

// 		if (response.value!.ok && data.value) 
// 			handleDataMapping(data.value);

// 		switch (statusCode.value) {
// 			case 404:
// 				return await router.push({ name: 'not-found' });
// 			case 400:
// 				return await router.push({ name: '/error/bad-request' });
// 			// Add additional cases as needed
// 			default:
// 				return // Handle other status codes if necessary
// 		}
// 	} catch (error) {
// 		console.error(error);
// 	}
// };
// await handleGetBusiness();

</script>

<style scoped>

</style>