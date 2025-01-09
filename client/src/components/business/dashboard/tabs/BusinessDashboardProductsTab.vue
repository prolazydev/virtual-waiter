<template>
	<div class="w-full flex flex-col gap-3">
		<!-- TODO: Implement the products (needs to be able to switch between a list and a grid, all virtual) -->
		<div class="products-main">
			<div class="flex flex-col gap-2">
				<div class="flex justify-between items-baseline">
					<h2 class="text-2xl font-semibold">Products</h2>
					<div class="relative">
						<button type="button" class="dropdown-btn" aria-haspopup="menu">
							Selected Business <span class="w-32 px-1 text-start border border-black overflow-hidden">{{ selectedBusiness }}</span>
						</button>
						<!-- TODO: Make an input search to filter out the businesses on the selection box (client side) -->
						<ul class="dropdown-content p-2 right-0 top-0">
							<li
								@click="selectedBusiness = 'All'"
								:class="{ 'font-semibold': selectedBusiness === 'All' }"
							>
								All
							</li>
							<li 
								v-for="(item) in businesses" :key="item.username"
								@click="selectedBusiness = item.username"
								:class="{ 'font-semibold': selectedBusiness === item.username }"
							>
								{{ item.displayName }}
							</li>
						</ul>
					</div>
				</div>

				<div class="product-section justify-between items-center">
					<!-- TODO: Craete a reusable input component, with props: style-typec size (for size of input), color -->
					<input 
						v-model="productQuery"
						type="text" 
						placeholder="Search for a Product"
						class="form-input w-52 pr-8"
					/>
					<!-- TODO: Make this a component -->
					<NewProductModal :businesses="businesses" />
				</div>
			</div>
			<div class="product-section justify-between items-center">
				<div class="w-full flex justify-between">
					<div class="relative">
						<button type="button" class="dropdown-btn" aria-haspopup="menu">
							Items per Page <span class="w-4 text-start">{{ itemsPerPage }}</span>
						</button>
						<ul class="dropdown-content p-2 right-0 top-0">
							<li 
								v-for="(item) in itemsPerPageOptions" :key="item"
								@click="itemsPerPage = item"
							>
								{{ item }}
							</li>
						</ul>
					</div>
					<div class="flex gap-3 items-center">
						<!-- TODO: Current page, total pages, total items, items per page -->
						<p>
							Showing: 1-10 of 100
						</p>
						<MyButton
							@click="switchProductsView" 
							style-type="clean" 
							class="hover-red-button"
						>
							<LucideIcon :name="listOrGridView ? 'List' : 'Grid3x3'" />
						</MyButton>
					</div>
				</div>
			</div>
			<!-- TODO: Products here -->
			<div class="product-section">
				<ProductsTable />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Business } from '@/types/models/business';

const businesses = ref<Business[]>([]);
const selectedBusiness = ref('All');

const productQuery = ref('');
const listOrGridView = ref(true);
const itemsPerPage = ref(10);

const switchProductsView = () => listOrGridView.value = !listOrGridView.value

const itemsPerPageOptions = [5, 10, 25, 50];

const getAllBusinessesByOwner = async () => {
	try {
		const { getAllOwnedBusinesses } = businessService();
		const { response, data } = await getAllOwnedBusinesses(['_id', 'displayName', 'username', ]);

		if (response.value?.ok && data.value) {
			businesses.value = data.value;
		} else {
			useTost('Error! Failed to get businesses');
		}
	} catch (error) {
		console.error(error);
	}
}

await getAllBusinessesByOwner();
</script>

<style scoped>
.products-main {
	@apply 	flex flex-col gap-3
}

.product-section {
	@apply 	w-full flex gap-5
}

.items-per-page {
	@apply 	bg-transparent cursor-pointer
}

.items-per-page > option {
	@apply  cursor-pointer
}

.dropdown-btn, .dropdown-btn-user {
    @apply flex gap-1 items-center cursor-pointer
    ;
}
.dropdown-btn:focus + .dropdown-content, .dropdown-btn-user:focus + .dropdown-content {
    @apply border-black visible opacity-100;
} 
.dropdown-btn:focus > .arrow {
	@apply rotate-180 
	;
    /* transform: rotate(180deg); */
}
.dropdown-btn:focus + .dropdown-content li, .dropdown-btn-user:focus + .dropdown-content li {
    @apply opacity-100 pointer-events-auto;
}

.dropdown-content {
    @apply  flex flex-col gap-1 w-fit text-start border-2 border-[#1b1b1b] bg-white opacity-0 transition-all 
            absolute top-9 shadow-lg
            pointer-events-none hover:pointer-events-auto hover:opacity-100 
}
.dropdown-content:hover > li {
    @apply opacity-100 pointer-events-auto;
}

.dropdown-content li {
    @apply  px-1 py-1 relative bg-white cursor-pointer opacity-0 transition-all z-10
            border-b-4 border-b-transparent 
            pointer-events-none
            hover:border-b-rose-600 
    ;
}
</style>