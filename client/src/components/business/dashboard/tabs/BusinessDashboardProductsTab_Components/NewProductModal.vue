<template>
	<MyDialog _class="add-product-dialog p-7 overflow-hidden" title="Add a Product" size="lg">
		<MyButton 
			@click="toggleDialog('.add-product-dialog')"
			style-type="full" 
			color="inverted-primary"
			size="sm"
		>
			Add a Product
		</MyButton>

		<template #body>
			<div class="w-full mx-auto py-3 flex flex-col gap-3 justify-between">
				<!-- TODO: Make an input search to filter out the businesses on the selection box (client side) -->
				<div class="flex gap-1 cursor-pointer">
					<label class="cursor-pointer" for="selectBusiness">Select a Business</label>
					<select v-model="selectedCreateProductBusiness" 
						class="border border-black cursor-pointer focus-visible:outline" 
						name="selectBusiness" 
						id="selectBusiness"
					>
						<option v-for="(item) in businesses" :key="item.username" :value="item.username">
							{{ item.displayName }}
						</option>
					</select>
				</div>
				<!-- TODO: inputs here: name, price, description, tags,  -->
				<div 
					:class="{ 'opacity-75 cursor-not-allowed': !selectedCreateProductBusiness }"
					class="flex flex-col w-1/2"
				>
					<div class="w-1/2 flex flex-col">
						<label for="product-name">Product Name</label>
						<input 
							id="product-name" 
							type="text" 
							placeholder="Product Name"
							class="form-input w-fit"
							:disabled="!selectedCreateProductBusiness"
						/>
					</div>
					<div class="w-1/2 flex flex-col">
						<label for="product-price">Product Price</label>
						<input 
							id="product-price" 
							type="number" 
							placeholder="Product Price"
							class="form-input w-fit"
							:disabled="!selectedCreateProductBusiness"
						/>
					</div>
				</div>
			</div>
		</template>

		<template #footer>
			<div class="w-full flex flex-col gap-5">
				<hr class="border-[#1b1b1b]">

				<MyButton @click="closeDialog" style-type="hollow" class="ml-auto">
					Close
				</MyButton>
			</div>
		</template>
	</MyDialog>
</template>

<script lang="ts" setup>
import type { Business } from '@/types/models/business';

defineProps<{
	businesses: Business[];
}>();

const { toggleDialog, isDialogClosed } = myDialog();

const selectedCreateProductBusiness = ref('');

watch(() => selectedCreateProductBusiness, (value) => {
	// TODO:
	console.log(value);
});

const closeDialog = () => {
	if (isDialogClosed('.add-product-dialog')) return;
	toggleDialog('.add-product-dialog');
}
</script>

<style scoped>

</style>