<template>
	<div class="">
		<div class="flex items-center justify-center h-full">
			<div class="text-center">
				<h1 class="text-4xl font-bold text-gray-800">Business Edit</h1>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { type Business } from '@/types/business';
const { params } = useRoute();
const router = useRouter();

// const { user } = useUserStore();

const { getBusinessSelf } = businessService();

const business = ref<Business>();

onMounted(async () => {
	await handleGetBusiness();
// handleGetBusiness();
})

const handleGetBusiness = async () => {
	try {
		const { response, statusCode, data } = await getBusinessSelf(params.id as string);

		if (response.value!.ok && data.value) 
			return business.value = data.value;

		switch (statusCode.value) {
			case 404:
				return await router.push({ name: 'notFound' });
			case 400:
				return await router.push({ name: 'badRequest' });
			// Add additional cases as needed
			default:
				return // Handle other status codes if necessary
		}

	} catch (error) {
		console.error(error);
	}
};

</script>

<style scoped>

</style>