<template>
	<div class="w-full flex flex-col h-full">
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
// 	    const { getOwnedBusinessById } = businessService();
// 		const { response, statusCode, data } = await getOwnedBusinessById(params.id);

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