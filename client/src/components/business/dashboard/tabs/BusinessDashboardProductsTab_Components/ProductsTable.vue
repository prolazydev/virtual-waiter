<template>
	<table class="products-table">
		<thead>
			<tr>
				<th>
					Id
				</th>
				<th>
					Name
				</th>
				<th>
					Description
				</th>
				<th>
					Image
				</th>
				<th>
					Price
				</th>
			</tr>
		</thead>
		<!-- TODO: Products here -->
		<template v-if="isLoadingProducts">
			<tr>
				<td colspan="5" class="p-4 text-center font-semibold">Loading</td>
			</tr>
		</template>
		<template v-else>
			<template v-if="productsData.length > 0">
				<tr v-for="(item) in productsData" :key="item._id">
					{{ item.name }}
				</tr>
			</template>
			<template v-else>
				<tr>
					<td colspan="5" class="p-4 text-center font-semibold">Empty :/</td>
				</tr>
			</template>
		</template>
	</table>
</template>

<script lang="ts" setup>
import type { Product } from '@/types/models/product';

const { params } = useRoute('business-dashboard-settings');
const router = useRouter();

const loader = useLoader();

const isLoadingProducts = ref(false);
const productsData = ref<Product[]>([]);

onMounted(async () => {
	await fetchProducts();
})

const fetchProducts = async () => {
	loader.startLoader();
	isLoadingProducts.value = true;
	// await new Promise((resolve) => setTimeout(async () => {
	// 	resolve('resolved');
	// }, 2000));
	try {
		const { getProductsByBusinessId } = productsService();
		// const { response, statusCode, data } = await getProductsByBusinessId(params.id);
		// console.log(data.value);
        // if (response.value?.ok && data.value) {
		// 	productsData.value?.push(...data.value)
        // }

	} catch (error) {
        console.error(error);   
	} finally {
		isLoadingProducts.value = false;
		loader.finishLoader();
	}
}
</script>

<style scoped>
.products-table, .products-table th {
	@apply px-2 border border-black
}

.products-table {
	@apply w-full
}

.products-table th:first-child {
	@apply w-24
}

.products-table tr:first-child {
	@apply border-b-2 border-b-black
}
</style>