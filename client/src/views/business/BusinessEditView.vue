<template>
	<div class="page-main">
		<div class="flex flex-col h-full">
			<div class="flex flex-col mx-auto">
				<h1 class="w-fit text-3xl font-bold text-[#1b1b1b] uppercase tracking-widest">Edit {{ business?.name }}</h1>
                <div class="h-1 w-4 mb-5 bg-[#1b1b1b]"></div>
			</div>

			<div class="p-5 flex bg-white border-2 border-[#1b1b1b]">
				<form @submit.prevent="handleEditBusiness" class="w-full flex justify-between gap-x-5">
					<section class="form-group">
						<h1 class="text-center text-2xl font-semibold">Basic Data</h1>
						
						<div class="flex justify-between">
							<div class="flex flex-col gap-3">
								<div class="flex flex-col gap-2">
									<label for="username">Username</label>
									<input type="text" name="username" id="username" :value="business?.name">
								</div>

								<div class="flex flex-col gap-2">
									<label for="email">Email</label>
									<input type="text" name="email" id="email" :value="business?.email">
								</div>

								<div class="flex flex-col gap-2">
									<label for="phone">Phone</label>
									<input type="text" name="phone" id="phone" :value="business?.phone">
								</div>

								<div class="flex flex-col gap-2">
									<label for="primaryAddress">Primary Address</label>
									<!-- <input type="text" name="primaryAddress" id="primaryAddress" :value="business?.streetAddress"> -->
									<button class="setup-address" type="button">
										Setup Primary Address
									</button>

									<div class="show-address-setup">
										<div class="flex flex-col gap-2">
											<label for="businessStreetAddress">Secondary Street Address</label>
											<input v-model="business!.streetAddress!.secondary!.address" type="text" id="businessStreetAddress" placeholder="St. DC Boulevard" />
										</div>
										<div class="flex flex-col gap-2">
											<label for="businessZipCode">Secondary Zip Code</label>
											<input v-model="business!.streetAddress!.secondary!.zipCode" type="text" id="businessZipCode" placeholder="13807" />
										</div>
									</div>
								</div>

								<div class="flex flex-col gap-2">
									<label for="secondaryAddress">Secondary Address</label>
									<button class="setup-address" type="button">
										Setup Secondary Address
									</button>

									<div class="show-address-setup">
										<div class="flex flex-col gap-2">
											<label for="businessStreetAddress">Secondary Street Address</label>
											<input v-model="business!.streetAddress!.secondary!.address" type="text" id="businessStreetAddress" placeholder="St. DC Boulevard" />
										</div>
										<div class="flex flex-col gap-2">
											<label for="businessZipCode">Secondary Zip Code</label>
											<input v-model="business!.streetAddress!.secondary!.zipCode" type="text" id="businessZipCode" placeholder="13807" />
										</div>
									</div>
								</div>
							</div>
							<div class="flex flex-col gap-3">
								<div class="flex flex-col gap-2">
									<label for="description">Description</label>
									<textarea name="description" id="description" :value="business?.description"></textarea>
								</div>
								
								<div class="flex flex-col gap-2">
									<label for="state">State</label>
									<input type="text" name="state" id="state" :value="business?.country">
								</div>

								<div class="flex flex-col gap-2">
									<label for="website">Website</label>
									<input type="text" name="website" id="website" :value="business?.website">
								</div>
							</div>
						</div>

						<button @click="handleSaveBasicData" class="w-fit px-2 py-1 mx-auto font-semibold tracking-widest text-white border-4 border-[#1b1b1b] bg-[#1b1b1b] uppercase active:border-b-white transition-colors">Save</button>
					</section>
					<div class="w-1 bg-[#1b1b1b]"></div>
					<section class="form-group">
						<h1 class="text-center text-2xl font-semibold">Basic Data</h1>
					</section>
					<div class="w-1 bg-[#1b1b1b]"></div>
					<section class="form-group">
						<h1 class="text-center text-2xl font-semibold">Owner Data</h1>

						<div class="flex justify-between">
							
						</div>
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

const handleSaveBasicData = async () => {
	
}

</script>

<style scoped>
.form-group {
	@apply w-full flex flex-col gap-5 relative
}

.form-group input, .form-group textarea {
	@apply 	w-60 p-2 border-2 border-[#1b1b1b] transition-colors
			focus:outline-none focus:border-b-rose-600
}

.form-group textarea {
	@apply 	h-[13.75rem]
}

.show-address-setup {
	@apply  p-5 flex flex-col gap-5 bg-white border-2 border-[#1b1b1b] shadow-lg transition-all duration-300
			absolute opacity-0 pointer-events-none z-[100]
			top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
			scale-90
}
.setup-address:focus + .show-address-setup, .setup-address:focus-within, .show-address-setup:hover {
	@apply 	opacity-100 pointer-events-auto scale-100
}

.setup-address {
	@apply  w-64 h-fit py-[6px] bg-[#1b1b1b] text-white px-2 border-4 border-[#1b1b1b] 
			focus:outline-none focus-visible:border-b-rose-600 active:border-b-white transition-all
}
</style>