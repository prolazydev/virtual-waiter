<template>
	<MyDialog _class="add-product-dialog p-7 overflow-hidden" title="Add a Product" size="xl">
		<template #default>
			<MyButton 
				@click="toggleDialog('.add-product-dialog')"
				style-type="full" 
				color="inverted-primary"
				size="sm"
				id="addProductButton"
			>
				Add a Product
			</MyButton>
		</template>

		<template #body>
			<div class="w-full mx-auto py-5 flex flex-col gap-3">
				<!-- TODO: Make an input search to filter out the businesses on the selection box (client side) -->
				<div class="w-fit relative z-10">
					<button type="button" class="dropdown-btn" autofocus="false" aria-haspopup="menu">
						Selected Business 
						<span class="w-32 px-1 text-start border border-black overflow-hidden">
							{{ selectedCreateProductBusiness.length > 0  ? businesses.find(b => b.username === selectedCreateProductBusiness)?.displayName : 'Not Selected' }}
						</span>
					</button>
					<!-- TODO: Make an input search to filter out the businesses on the selection box (client side) -->
					<ul class="dropdown-content p-2 right-0 top-0">
						<li 
							v-for="(item) in businesses" :key="item.username"
							@click="selectBusiness(item.username)"
							:class="{ 'font-semibold': selectedCreateProductBusiness === item.username }"
						>
							{{ item.displayName }}
						</li>
					</ul>
				</div>
				<!-- TODO: inputs here: name, price, description, tags,  -->
				<div 
					:class="{ 'opacity-75': !selectedCreateProductBusiness }"
					class="w-full h-full flex gap-7"
				>
					<div class="w-full flex flex-col gap-3">
						<div class="w-full flex flex-col gap-2">
							<label for="product-name">Name</label>
							<input 
								v-model="productData.name"
								id="product-name" 
								type="text" 
								placeholder="Name"
								class="form-input "
								:disabled="!selectedCreateProductBusiness"
							/>
						</div>
						<div class="w-full flex flex-col gap-2">
							<label for="product-price">Price</label>
							<input 
								id="product-price" 
								type="number" 
								placeholder="Price"
								class="form-input "
								:disabled="!selectedCreateProductBusiness"
							/>
						</div>
						<div class="w-full flex flex-col">
							<label for="product-description">Description</label>
							<textarea 
								id="product-description" 
								placeholder="Description"
								class="form-input overflow-y-scroll"
								:disabled="!selectedCreateProductBusiness"
								rows="5"
							></textarea>
						</div>

						<DebounceSearch
							v-model="productData.categoryDisplayName"
							:debounce-delay="500"
							@debounce-fn="debounceCategorySearch"
							input-type="text"
							id="productCategoryList"
							label="Category"
							placeholder="Beverages, Food, etc."
							input-class="form-input product-category-input"
						>
							<template #bottom>
								<ul 
									:class="{ 'show-search-results': searchResults && searchResults.length > 0 }"
									class="search-result" 
								>
									<li v-for="item in searchResults" :key="item._id">
										<button 
											@click="selectProductCategory(item._id, item.name)"
											class=" text-start"
											type="button" 
											:title="`${item.name} - ${item.description}`"
										> 
											<div class="flex flex-col">
												<span>{{ item.name }}</span>
												<div class="text-sm text-gray-500">{{ item.description }}</div>
											</div>
										</button>
									</li>
								</ul>
							</template>
						</DebounceSearch>

						
						<div class="flex flex-col gap-2 relative">
							<!-- productDietaryInformation -->
							<label for="productDietaryInformation">Dietary Information</label>
							<ul class="relative">
								<li class="flex gap-2 items-center" v-for="(item) in selectedProductDietaryOptions" :key="item">
									<span>{{ item }}</span>
									<LucideIcon @click="selectedProductDietaryOptions.pop()" name="X" :size="14" />
								</li>
								<li class="w-fit flex items-center ">
									<!-- <input :disabled="selectedProductDietaryOptions.length < 3 ? false : true" @input="autosizeWidth" @keydown.backspace="handlePop" v-model="categoryInput" id="businessCategories" :placeholder="selectedProductDietaryOptions.length < 3 ? 'Business Categories' : 'Please remove a category to add a new one'" autocomplete="off" /> -->

									<ul :class="{ 'show-business-categories-input': productDietaryResult.length > 0 }" class="business-categories-result">
										<li 
											v-for="(item, index) in productDietaryResult" :key="index" 
											@click="" 
											class="flex gap-1"
										>
											<p 
												v-if="item.parentCategories[0]" 
												class="capitalize"
											>
												{{ item.parentCategories[0] }} - 
											</p> 
										</li>
									</ul>
								</li>
							</ul>
							<input 
								class="form-input"
								id="productDietaryInformation"
								placeholder="test"
								autocomplete="off"
							/>
						</div>
					</div>

					<div class="w-full">
						<MyDialog _class="setup-product-media-dialog p-5" size="lg">
							<label for="setupProductMedia">Media</label>
							<MyButton 
								@click="toggleDialog(`.setup-product-media-dialog`)" 
								style-type="hollow"
								id="productMedia" 
								class="form-button-1" 
								type="button"
								:disabled="!selectedCreateProductBusiness"
							>
								Setup Media
							</MyButton>

							<template #body>
								<div class="w-full h-[38rem] overflow-hidden">
									<template v-if="mediaData.length > 0">
										<label class="product-image-label" for="productImage">
											<img 
												:src="parseBase64Image(mediaData)" 
												alt="field.label"
												class="max-w-[38rem] m-auto shadow-black scale-[.975] transition-all"
											/>
										</label>
									</template>

									<label v-else class="w-full h-full flex my-hover-dark-shadow overflow-hidden" for="productImage">
										<LucideIcon name="ImagePlus" size="64" class="m-auto stroke-2 " />
									</label>

									<input 
										@change="(e) => handleFileUpload(e)"
										id="productImage"
										type="file" 
										accept="image/*"
										class="hidden" 
									/>
								</div>
							</template>

							<template #footer>
								<div class="w-full flex justify-end gap-5">
									<MyButton>Save</MyButton>
									<MyButton @click="toggleDialog(`.setup-product-media-dialog`)" style-type="hollow">
										Cancel
									</MyButton>
								</div>
							</template>
						</MyDialog>
					</div>

					<!-- <div class="w-1 h-full bg-black"></div>

					<div class="w-full flex justify-center items-center">
						
					</div> -->
				</div>
			</div>
		</template>

		<template #footer>
			<div class="w-full flex flex-col gap-5">
				<hr class="border-[#1b1b1b]">
				<div class="w-full flex justify-end gap-3">
					<!-- TODO: Save new Product, use animation -->
					 
					<MyButton @click="handleAddProduct" style-type="full">
						<CustomLoader :state="editFormState(loadingState)">
							Save
						</CustomLoader>
					</MyButton>
					<MyButton @click="closeDialog('.add-product-dialog')" style-type="hollow">
						Close
					</MyButton>
				</div>
			</div>
		</template>
	</MyDialog>
</template>

<script lang="ts" setup>
import productCategoryService from '@/services/CRUD/productCategory.service';
import type { LoadingState } from '@/types';
import type { Business } from '@/types/models/business';
import type { ProductForm } from '@/types/models/product';

const props = defineProps<{
	businesses: Business[];
}>();

const loader = useLoader();
const { toggleDialog, isDialogClosed } = myDialog();

const selectedCreateProductBusiness = ref('');

const productData = ref<ProductForm>({
	name: '',
	description: '',
	price: 0,
	businessId: '',
	image: '',
	categoryId: '',
	categoryDisplayName: '',
});
const mediaData = ref('');

const isProductCategorySelectedDebounce = ref(false);
const searchResults = ref<{ _id:string, name:string, description:string }[]>([]);

const selectedProductDietaryOptions = ref<string[]>([]);
const productDietaryResult = ref<{ name: string, parentCategories: string[] }[]>([]);
const loadingState = ref<LoadingState>('idle');


const editFormState = computed(() => 
    (state: LoadingState | 'edit' | 'preview') => {
        switch (state) {
            case 'edit':
                return 'idle';
            case 'loading':
                return 'loading';
            case 'success':
                return 'success';
            case 'preview':
                return 'idle';
            case 'error':
            default:
                return 'idle';
        }
    }
);

const handleAddProduct = () => {
	const { addProduct } = productsService();
	try {
		loadingState.value = 'loading';
		// const {  } = addProduct(productData.value);
	} catch (error) {
		console.error(error);
		
	}
};

// TODO: Implement this
const debounceCategorySearch = async (searchQuery: string) => {
	if (isProductCategorySelectedDebounce.value) {
		isProductCategorySelectedDebounce.value = false;
		return;
	}
	try {

		// const { addProduct } = productsService();
		// // product_category
		// loader.startLoader();
		
		// const { response, data } = await addProduct(productData.value);

		// console.log(data.value);

		// if (!response.value?.ok) {
		// 	throw new Error('Failed to fetch location data');
		// }
		// searchResults.value = await res.json();
		// console.log(searchResults.value);
	} catch (error) {
		console.error('Location search failed:', error);
	} finally {
		// loader.finishLoader();
	}
}

const selectBusiness = async (businessId: string) => {
	selectedCreateProductBusiness.value = businessId;
	productData.value.businessId = businessId;

	try {
		loader.startLoader();
		const { getAllProductCategories } = productCategoryService();
		const { response, data } = await getAllProductCategories();

		console.log(data.value);
		if (response.value?.ok) {
			searchResults.value = data.value!;
		}

	} catch (error) {
		console.error('Failed to fetch product categories:', error);	
	} finally {
		loader.finishLoader();
	}

	// await debounceCategorySearch('');
}

const selectProductCategory = async (categoryId: string, categoryDisplayName: string) => {
	productData.value.categoryId = categoryId;
	productData.value.categoryDisplayName = categoryDisplayName;
	isProductCategorySelectedDebounce.value = true;
	
}

// const handlePop = () => {
// 	if (categoryInput.value.length === 0 && selectedBusinessCategories.value.length > 0)
// 		selectedBusinessCategories.value.pop();
// };

const closeDialog = (dialogElement: string) => {
	if (isDialogClosed(dialogElement)) return;
	toggleDialog(dialogElement);
}

const handleFileUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            mediaData.value = reader.result as string;
            // mediaData.state = 'preview';
        }
    }
}

const autosizeWidth = async (e: Event | HTMLTextAreaElement) => {
	if (e instanceof Event) {
		const length = (e.target as HTMLInputElement).value.length;

		(e.target as HTMLInputElement).style.width = `${Math.max(20, length + 3)}ch`;

	} else
		e.style.width = Math.max(20, e.value.length + 3) + 'ch';

	// await debounceSearchCategories('');
};

const parseBase64Image = (e: string) => {
    return e.startsWith('data') ? e : `data:image/png;base64,${e}`;
}

// const formatText = (name: string) => {
// 	const index = name.toLowerCase().indexOf(categoryInput.value.toLowerCase());

// 	if (index !== -1) {
// 		const before = name.substring(0, index);
// 		const match = name.substring(index, index + categoryInput.value.length);
// 		const after = name.substring(index + categoryInput.value.length);
// 		return `${before}<span style="font-weight: bold;">${match}</span>${after}`;
// 	}

// 	// If the query is not found, return the original name
// 	return name;
// };
</script>

<style>
.add-product-dialog .dialog-body {
	@apply h-full
}
</style>

<style scoped>

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

.product-image-label {
	@apply w-full h-full flex overflow-hidden cursor-pointer
}

.product-image-label:hover > img {
	@apply duration-300 shadow-lg scale-[.990] 
} 

.product-image-label:active > img {
	@apply shadow-none scale-[.975]
}

/* DEBOUNCE */
.debounce-search-input ul {
	@apply 	h-fit p-2 flex gap-2 border-2 border-[#1b1b1b] transition-[border]
			focus:outline-none focus:border-b-rose-600 
	;
}

.search-result {
	@apply	max-h-64 w-full flex flex-col flex-nowrap bg-white shadow-lg absolute transition-all duration-300
            top-[calc(100%-3rem)] opacity-0 pointer-events-none 
            overflow-x-hidden overflow-y-scroll z-[500]
	;
}

.debounce-search-input .search-result {
	@apply 	p-2 cursor-pointer border-b-2  
			hover:border-b-rose-700
			transition-all duration-300
	;
}

.search-result li {
	@apply 	p-2 cursor-pointer border-b-2  
			hover:border-b-rose-700
			transition-all duration-300
	;
}

.debounce-search-input > input:focus + .show-business-categories-input {
    @apply  opacity-100 pointer-events-auto top-[calc(100%+0.75rem)] 
	;
}

.product-category-input {
	@apply w-full
}

.product-category-input:focus + .show-search-results, .search-result:hover {
	@apply  opacity-100 pointer-events-auto top-[calc(100%+0.75rem)] 
	;
}

</style>