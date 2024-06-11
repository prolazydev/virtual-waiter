<template>
	<div class="page-main">
		<div class="flex flex-col h-full">
			<div class="flex flex-col mx-auto">
				<h1 class="w-fit text-3xl font-bold text-[#1b1b1b] uppercase tracking-widest">Edit {{ business?.name }}</h1>
                <div class="h-1 w-4 mb-5 bg-[#1b1b1b]"></div>
			</div>

			<div class="px-5 py-3 flex border-2 border-[#1b1b1b]">
				<form @submit.prevent="handleEditBusiness" class="w-full flex justify-between">
					<section class="form-group">
						<h1 class="text-center text-xl font-semibold">Basic Data</h1>
						
						<div class="flex flex-col">
							<label for="username">Username</label>
							<input type="text" name="username" id="username" :value="business?.name">
						</div>
					</section>
					<section>
						<h1 class="text-center text-xl font-semibold">Basic Data</h1>
	
					</section>
					<section>
						<h1 class="text-center text-xl font-semibold">Basic Data</h1>
	
					</section>
				</form>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { type Business } from '@/types/business';
const { params } = useRoute();
const router = useRouter();

// const { user } = useUserStore();

const { getBusinessSelfById } = businessService();

const business = ref<Business>();

onMounted(async () => {
})

const handleGetBusiness = async () => {
	try {
		const { response, statusCode, data } = await getBusinessSelfById(params.id as string);

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
await handleGetBusiness();

const handleEditBusiness = async () => {
	
}

</script>

<style scoped>
.form-group {
	@apply flex flex-col gap-10
}

.form-group input {
	@apply 	w-64 p-2 border-2 border-[#1b1b1b] transition-colors
			focus:outline-none focus:border-b-rose-600
}

.form-group label {
	@apply text-lg font-semibold
}
</style>