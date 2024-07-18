<template>
    <div v-once>
        <div v-for="(item) in 10" :key="item">
         ...
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type Business } from '@/types/models/business';

const router = useRouter();

const businesses = ref<Business[]>([]);
const favoriteBusinesses = ref<Business[]>([]);

const getBusinesses = async () => {
	const { getBusinessesSelf } = businessService();
	try {
		const { response, statusCode, data } = await getBusinessesSelf();

		if (response.value!.ok && data.value) {
			businesses.value = data.value;

            console.log(businesses.value);
			
			favoriteBusinesses.value = businesses.value;
		}

		// TODO: handle error
		switch (statusCode.value) {
			case 400:
				return await router.push({ name: '/error/bad-request' });
			case 401:
				// TODO: create bad request page
				return await router.push({ name: '/error/bad-request' });
			// Add additional cases as needed
			default:
				return // Handle other status codes if necessary
		}
	} catch (error) {
		console.error(error);
	}
};
await getBusinesses();

const handleSearch = (e: Event) => {
	console.log('searching...');
}

</script>

<style scoped>

</style>