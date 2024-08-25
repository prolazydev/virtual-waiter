<template>
	<div class="w-full flex-col h-full">
        <section class="flex flex-col mx-auto">
			<h1 class="w-fit text-3xl font-bold text-[#1b1b1b] uppercase tracking-widest">Access Settings for {{ business?.username }}</h1>
			<div class="h-1 w-4 mb-5 bg-[#1b1b1b]"></div>
        </section>
		{{ business }}
	</div>
</template>

<script lang="ts" setup>
import type { Business } from '@/types/models/business';

const { params } = useRoute('/business/settings/[id]');
const router = useRouter();

const loader = useLoader();

const business = ref<Business>({} as Business);

defineProps<{
    business: Business;
}>();

const handleDataMapping = (data: Business) => {
	business.value = data;
    loader.finishLoader();

	// const businessEditKeys = Object.keys(data);

	// for (let i = 0; i < businessEditKeys.length; i++) {
	// 	const key = businessEditKeys[i] as keyof BusinessEdit;

		// if (business.value[key] !== undefined)
		// 	businessEdit.value[key] = (business.value[key as keyof Business]) as any;
	// }

	// contactListFields.value = [];
	// for (let i = 0; i < business.value.contacts.length; i++) {
	// 	contactListFields.value.push({
	// 		type: business.value.contacts[i].contactType,
	// 		value: business.value.contacts[i].value,
	// 		state: 'edit',
	// 		processingState: 'idle',
	// 	});
	// }
}

const handleGetBusiness = async () => {
	try {
        loader.startLoader();
	    const { getBusinessSelfById } = businessService();
		const { response, statusCode, data } = await getBusinessSelfById(params.id);

		if (response.value!.ok && data.value) 
			handleDataMapping(data.value);

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
};
await handleGetBusiness();

</script>

<style scoped>

</style>