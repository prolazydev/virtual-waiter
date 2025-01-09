<template>
	<MyDialog _class="add-product-dialog p-7 overflow-hidden" title="Add a Product" size="xl">
		<MyButton 
			@click="toggleDialog('.add-product-dialog')"
			style-type="full" 
			color="inverted-primary"
			size="sm"
		>
			Add a Product
		</MyButton>

		<template #body>
			<div class="w-full mx-auto py-5 flex flex-col gap-3 justify-between">
				<!-- TODO: Make an input search to filter out the businesses on the selection box (client side) -->
				<div class="w-fit relative z-10">
					<button type="button" class="dropdown-btn" aria-haspopup="menu">
						Selected Business 
						<span class="w-32 px-1 text-start border border-black overflow-hidden">
							{{ selectedCreateProductBusiness.length > 0  ? selectedCreateProductBusiness : 'Not Selected' }}
						</span>
					</button>
					<!-- TODO: Make an input search to filter out the businesses on the selection box (client side) -->
					<ul class="dropdown-content p-2 right-0 top-0">
						<li 
							v-for="(item) in businesses" :key="item.username"
							@click="selectedCreateProductBusiness = item.username"
							:class="{ 'font-semibold': selectedCreateProductBusiness === item.username }"
						>
							{{ item.displayName }}
						</li>
					</ul>
				</div>
				<!-- TODO: inputs here: name, price, description, tags,  -->
				<div 
					:class="{ 'opacity-75 cursor-not-allowed': !selectedCreateProductBusiness }"
					class="w-1/2 flex flex-col gap-3"
				>
					<div class="w-1/2 flex flex-col">
						<label for="product-name">Product Name</label>
						<input 
							v-model="productData.name"
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

					<MyDialog 
						:_class="`product-media-dialog p-7 gap-10 dialog-body-full`" 
						:title="`Setup Media`" 
						size="lg"
						class="min-w-52"
					>
						<label for="productMediaDialog">Media</label>
						<MyButton 
							@click="toggleDialog('.product-media-dialog')" 
							style-type="full" 
							:disabled="!selectedCreateProductBusiness"
							id="productMediaDialog" 
							type="button"
						>
							Setup Media
						</MyButton>
						
						<template #body>
							<div class="w-full mt-5 flex flex-col gap-5 overflow-hidden">
								<template v-if="mediaData.length > 0">
									<label for="MediaSetup">
										<img 
											:src="parseBase64Image(mediaData)" 
											alt="field.label"
											class="max-w-[35rem] mx-auto shadow-black scale-[.975] transition-all duration-300 hover:shadow-lg hover:scale-[.990] active:scale-[.975]"
										/>
									</label>
								</template>
								
								<label v-else class="w-full h-full flex my-hover-dark-shadow overflow-hidden" for="MediaSetup">
									<LucideIcon name="ImagePlus" size="64" class="m-auto stroke-2 " />
								</label>

								<input 
									@change="(e) => handleFileUpload(e)"
									id="MediaSetup"
									type="file" 
									accept="image/*"
									class="hidden" 
								/>

								<div class="w-full h-[1px] mb-3 bg-black"></div>
							</div>
						</template>

						<template #footer>
							<!-- TODO: Save selection -->
							<div class="w-full flex justify-end gap-5">
								<MyButton @click="closeDialog('.product-media-dialog')" style-type="full" type="button">
									Save
								</MyButton>
								<MyButton @click="closeDialog('.product-media-dialog')" style-type="hollow" type="button">
									Cancel
								</MyButton>
							</div>
						</template>
					</MyDialog>
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
import type { LoadingState } from '@/types';
import type { Business } from '@/types/models/business';
import type { ProductForm } from '@/types/models/product';

defineProps<{
	businesses: Business[];
}>();

const { toggleDialog, isDialogClosed } = myDialog();

const selectedCreateProductBusiness = ref('');

const productData = ref<ProductForm>({
	name: '',
	description: '',
	price: 0,
	businessId: '',
	image: '',
});
const mediaData = ref('');

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

const parseBase64Image = (e: string) => {
    return e.startsWith('data') ? e : `data:image/png;base64,${e}`;
}
</script>

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
</style>