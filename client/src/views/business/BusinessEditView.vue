<template>
	<div class="page-main gap-10">
		<section class="flex flex-col h-full gap-5">
			<div class="flex flex-col mx-auto">
				<h1 class="w-fit text-3xl font-bold text-[#1b1b1b] uppercase tracking-widest">Edit {{ business?.name }}</h1>
                <div class="h-1 w-4 mb-5 bg-[#1b1b1b]"></div>
			</div>

			<div class="p-5 flex bg-white border-4 border-[#1b1b1b]">
				<form @submit.prevent="handleEditBusiness" class="w-full flex justify-between gap-x-5 relative">
					<div class="form-group w-2/3">
						<h1 class="text-center text-2xl font-semibold">Basic Data</h1>

						<hr class="border-[#1b1b1b]">
						
						<div class="flex gap-5">
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
									<button class="form-button-1 setup-address" type="button">
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
									<button class="form-button-1 setup-address" type="button">
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

							<div class="w-60 flex flex-col gap-3">
								<div class="flex flex-col gap-2 z-10">
									<div class="flex flex-col gap-2">
										<label for="setupHoursbtn">Hours</label>

										<div class="flex items-center gap-1">
											<button @click="openSetHours = !openSetHours" class="form-button-1 w-full" id="setupHoursbtn">
												Setup Hours
											</button>

											<LucideIcon class="fill-[#1b1b1b]" name="Circle" :size="24" :stroke-width="0" />

											<button class="form-button-1 show-hours w-full">
												Show Hours
											</button>

											<div class="hours-table">
												<h1 class="text-xl font-semibold text-center">Business Hours</h1>
												
												<div v-for="(key) in Object.keys(business!.hours!)" :key="key" class="flex">
													<h3 class="font-bold capitalize">{{ key }}:</h3>
													<p v-if="business!.is24">Open 24h</p>
													<p v-else>{{ business!.hours![key as Days] ? business!.hours![key as Days] : '00:00-00:00' }}</p>
												</div>
											</div>
										</div>
									</div>

									<div :class="{ 'open-business-hours': openSetHours }" class="business-hours">
										<h1 class="text-xl font-semibold text-center">Setup Business Hours</h1>
										<div class="w-full h-1 bg-[#1b1b1b]"></div>
										
										<LucideIcon @click="resetHours" class="absolute my-shadow my-shadow-black" name="ListRestart" :stroke-width="2" />
										<LucideIcon @click="openSetHours = false" class="absolute right-4 my-shadow" name="X" :stroke-width="2" />

										<div :class="{ 'open-business-hours': openSetHours }" class="business-hours">
											<h1 class="text-xl font-semibold text-center">Setup Business Hours</h1>
											<div class="w-full h-1 bg-[#1b1b1b]"></div>
											
											<Checkbox @change="set24hourSchedule" v-model="business!.is24" class="form-checkbox h-8 flex items-center" _id="useUserEmail" _label="Is open 24/7" />


											<LucideIcon @click="resetHours" class="absolute my-shadow my-shadow-black" name="ListRestart" :stroke-width="2" />
											<LucideIcon @click="openSetHours = false" class="absolute right-4 my-shadow" name="X" :stroke-width="2" />

											<div class="flex flex-col gap-3">
												<div v-for="(item, index) in Object.keys(business!.hours!)" :key="index" class="flex gap-5 items-center">
													
													<label class="w-20 mr-5 font-bold text-lg capitalize" :for="`business${item}`">{{ item }}:</label>
													<input v-model="business!.hours![item as KeyHours]" :readonly="business24Hours[item as KeyHours]" type="text" :id="`business${item}`" placeholder="09:00-17:00">
													
													<Checkbox 
														@indeterminate="(e, c) => setIndeterminateClosed(e, c, item)" 
														indeterminate 
														:disabled="business24Hours[item as KeyHours] && business.is24"
														class="form-checkbox" 
														:_id="item" 
														_label="24h | Closed" 
													/>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="flex flex-col gap-2">
									<div class="business-categories-input relative flex flex-col gap-2">
										<label for="businessCategories">Business Categories</label>
										<ul class="relative">
											<li class="flex gap-2 items-center" v-for="(item) in selectedBusinessCategories" :key="item">
												<span>{{ item }}</span>
												<LucideIcon @click="selectedBusinessCategories.pop()" name="X" :size="14" />
											</li>
											<li class="w-fit flex items-center ">
												<input :disabled="selectedBusinessCategories.length < 3 ? false : true" @input="autosizeWidth" @keydown.backspace="handlePop" v-model="categoryInput" id="businessCategories" :placeholder="selectedBusinessCategories.length < 3 ? 'Business Categories' : 'Please remove a category to add a new one'" autocomplete="off" />

												<ul :class="{ 'show-business-categories-input': categoriesResult.length > 0 }" class="business-categories-result">
													<li v-for="(item, index) in categoriesResult" :key="index" @click="addCategory(item.name)" class="flex gap-1">
														<p v-if="item.parentCategories[0]" class="capitalize">{{ item.parentCategories[0] }} - </p> <span v-html="formatText(item.name)"></span>
													</li>
												</ul>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<!-- TODO: Maybe create a gallery to fetch the already uploaded images and select them internally via custom ui -->
							<div class="w-60 flex flex-col gap-3">
								<!-- NOTE: Ordered like this to use the + css selector on focus -->
								<div class="w-full flex flex-col gap-2">
									<label for="profileImageBtn">Profile Image</label>

									<button @click="toggleDialog('.profile-image-dialog')" class="form-button-1" id="profileImageBtn">Setup Profile Image</button>
									
									<MyDialog class="profile-image-dialog">
										<template #head>
											<LucideIcon @click="toggleDialog('.profile-image-dialog')" class="cursor-pointer" name="X" :size="48" />
										</template>

										<template #body>
											<div class="w-full flex justify-center">
												<img class="preview-image" v-if="imageData" :src="imagePreview" alt="Preview Image">
												<LucideIcon v-else class="text-gray-600 absolute-center" name="ChefHat" :size="160" :stroke-width="1"/>
											</div>
										</template>

										<template #footer>
											<div class="w-full flex gap-5 justify-end relative">
												<div class="flex gap-5 absolute-center">
													<input @change="handlePreviewImage" class="hidden" type="file" name="profileImage" id="profileImage">
													<label class="form-button-2 text-center cursor-pointer" for="profileImage">{{ imageData ? 'Change' :  'Select a Profile Image' }}</label>

													<button @click="saveImageData('profileImage')" v-if="imageData" class="form-button-2">
														Save
													</button>
												</div>
												
												<button @click="toggleDialog('.profile-image-dialog')" class="form-button-1">Close</button>
											</div>
										</template>
									</MyDialog>
								</div>
								<div class="flex flex-col gap-2">
									<label for="coverImageBtn">Profile Cover Image</label>
									<button @click="toggleDialog('.cover-image-dialog')" class="form-button-1" id="coverImageBtn">Setup Cover Image</button>

									<MyDialog class="cover-image-dialog">
										<template #head>
											<LucideIcon @click="toggleDialog('.cover-image-dialog')" class="cursor-pointer" name="X" :size="48" />
										</template>

										<template #body>
											<div class="w-full flex justify-center">
												<img class="preview-image" v-if="imageData" :src="imagePreview" alt="Preview Image">
												
												
												<LucideIcon v-else class="text-gray-600 absolute-center" name="ChefHat" :size="160" :stroke-width="1"/>
											</div>
										</template>

										<template #footer>
											<div class="w-full flex gap-5 justify-end relative">
												<div class="flex gap-5 absolute-center">
													<input @change="handlePreviewImage" class="hidden" type="file" name="profileImage" id="profileImage">
													<label class="form-button-2 text-center cursor-pointer" for="profileImage">{{ imageData ? 'Change' :  'Select a Cover Image' }}</label>
													

													<button @click="saveImageData('coverImage')" v-if="imageData" class="form-button-2">
														
														Save
													</button>
												</div>
												
												<button @click="toggleDialog('.cover-image-dialog')" class="form-button-1">Close</button>
											</div>
										</template>
									</MyDialog>
								</div>
							</div>
						</div>

						<button @click="handleSaveBasicData" class="w-fit px-2 py-1 mx-auto font-semibold tracking-widest text-white border-4 border-[#1b1b1b] bg-[#1b1b1b] uppercase active:border-b-white transition-colors">
							Save
						</button>
					</div>

					<div class="w-1 bg-[#1b1b1b]"></div>
					
					<div class="form-group w-1/3">
						<h1 class="text-center text-2xl font-semibold">Owner Data</h1>

						<hr class="border-[#1b1b1b]">


						<div class="flex justify-between">
							
						</div>
					</div>
				</form>
			</div>
		</section>

		<section class="flex flex-col">
			<!-- TODO: Toggle preview changes -->
			<button @click="togglePreviewChanges" class="w-fit mx-auto px-2 py-1 font-semibold tracking-widest text-white bg-[#1b1b1b] border-2 border-[#1b1b1b] active:border-b-white uppercase">
				Preview Changes
			</button>

			<div class="preview-changes">

			</div>
		</section>

		{{ business }}

		<!-- TODO: Business Preview -->
	</div>
</template>

<script lang="ts" setup>
import { type Business, type BusinessCategory, type BusinessEdit, type Days, type KeyHours } from '@/types/business';

const { params } = useRoute();
const router = useRouter();

// const { user } = useUserStore();

const { getBusinessSelfById } = businessService();

const business = ref<Business>({} as Business);
const businessEdit = ref<BusinessEdit>({} as BusinessEdit);

const imageData = ref<ArrayBuffer | null>();
const imagePreview = ref<string>('');

const categoryInput = ref('');
const categoriesResult = ref<BusinessCategory[]>([]);
const selectedBusinessCategories = ref<string[]>([]);

const openSetHours = ref(false);
const business24Hours = ref({
	monday: false,
	tuesday: false,
	wednesday: false,
	thursday: false,
	friday: false,
	saturday: false,
	sunday: false
});

onMounted(() => {
	const textarea = document.querySelector<HTMLTextAreaElement>('#businessCategories')!;

	autosizeWidth(textarea);
});


const autosizeWidth = async (e: Event | HTMLTextAreaElement) => {
	if (e instanceof Event) {
		const length = (e.target as HTMLInputElement).value.length;

		(e.target as HTMLInputElement).style.width = `${Math.max(20, length + 3)}ch`;

	} else
		e.style.width = Math.max(20, e.value.length + 3) + 'ch';

	await debounceSearchCategories();
};

const debounceSearchCategories = useDebounceFn(async () => {
	if (categoryInput.value.length === 0) {
		categoriesResult.value = [];
		return;
	}

	const { response, data } = await myFetch(`business_category/name/${categoryInput.value}`);
	if ( response.value?.ok ) {
		categoriesResult.value = data.value;
	}
}, 500);

const addCategory = (name: string) => {
	if (selectedBusinessCategories.value.length === 2)
		categoryInput.value = '';
	if (selectedBusinessCategories.value.length < 3) {
		selectedBusinessCategories.value.push(name);
		business.value!.categories = selectedBusinessCategories.value;
		return;
	}
};

const formatText = (name: string) => {
	const index = name.toLowerCase().indexOf(categoryInput.value.toLowerCase());

	if (index !== -1) {
		const before = name.substring(0, index);
		const match = name.substring(index, index + categoryInput.value.length);
		const after = name.substring(index + categoryInput.value.length);
		
		return `${before}<span style="font-weight: bold;">${match}</span>${after}`;
	}

	// If the query is not found, return the original name
	return name;
};

const handlePop = () =>
	categoryInput.value.length === 0 && selectedBusinessCategories.value.length > 0 && selectedBusinessCategories.value.pop();

const setAllHours = (hour: string, boolVal: boolean = true) => {
	Object.keys(business.value?.hours!).forEach((key) => {
		business.value!.hours![key as Days] = hour;
		business24Hours!.value[key as Days] = boolVal;
	});

	document.querySelectorAll<HTMLInputElement>('.business-hours .form-checkbox input[type="checkbox"]')
		.forEach((el) => {
			el.checked = boolVal;
			el.readOnly = false;
			el.indeterminate = false;
		});
};

const setIndeterminateClosed = (value: string, checked: boolean, key: string) => {
	if (!value && checked) {
		business!.value!.hours![key as Days] = '24';
		business24Hours.value[key as Days] = true;
	}
	else if (value && value.length > 0) {
		business!.value!.hours![key as Days] = 'Closed';
		business24Hours.value[key as Days] = true;
	}
	else {
		business!.value!.hours![key as Days] = '';
		business24Hours.value[key as Days] = false;
	}
};

const set24hourSchedule = () => business?.value!.is24 
	? setAllHours('')
	: setAllHours('00:00-00:00', false);
	
const resetHours = () => setAllHours('', false);

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

};

const handleSaveBasicData = async () => {

};

// TODO: Dynamically import the component to preview the changes
const togglePreviewChanges = () => {

};

const saveImageData = <T extends keyof BusinessEdit>(propertyName: T) => {
	businessEdit.value[propertyName] = imagePreview.value as BusinessEdit[T];
}

const toggleDialog = (dialog: string) => {
	console.log(dialog);
	const el = document.querySelector(dialog) as HTMLDialogElement;

	// check if it has the "open" attribute
	if (el.hasAttribute('open')) {
		el.close();
		imageData.value = null;
		imagePreview.value = '';
	}
	else {
		imageData.value = null;
		imagePreview.value = '';
		el.showModal();
	}
};

const handlePreviewImage = async (e: Event) => {
	const input = e.target as HTMLInputElement;

	if (input.files && input.files.length > 0) {
		const reader = new FileReader();
		reader.readAsArrayBuffer(input.files[0]);
		reader.onload = () => {
			imageData.value = reader.result as ArrayBuffer;
			imagePreview.value = arrayBufferToBase64(imageData.value, input.files![0].type);
		};
		reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };
	}

	// 	imageData.value = URL.createObjectURL(input.files[0]);
	// const imagePreview = ref<string>();
};

const arrayBufferToBase64 = (buffer: ArrayBuffer, mimeType: string) => {
	let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64String = window.btoa(binary);
      return `data:${mimeType};base64,${base64String}`;
};

// const handleCoverImage = async (e: Event) => {

// };
</script>

<style scoped>
.form-group {
	@apply flex flex-col gap-5 
}

.form-group input, .form-group textarea {
	@apply 	w-60 p-2 border-2 border-[#1b1b1b] transition-colors cursor-pointer
			focus:outline-none focus:border-b-rose-600
}

.form-group textarea {
	@apply 	h-[13.75rem]
}

#profileImage:hover + div > label, #coverImage:hover + div > label {
	@apply border-b-rose-600
}

.form-button-1 {
	@apply 	h-fit px-1 py-2 border-2 border-transparent border-b-[#1b1b1b] outline-none 
			focus:outline-none focus:border-b-rose-600 active:border-b-rose-600 transition-all
}

.form-button-2 {
	@apply 	h-fit px-3 py-2 border-2 border-transparent border-[#1b1b1b] outline-none 
			focus:outline-none focus:border-b-rose-600 active:border-b-rose-600 transition-all

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

.business-hours, .hours-table {
	@apply 	w-max h-fit py-5 pt-3 px-5 bg-[#f9f9f9] flex flex-col gap-5 transition-all duration-300
			border-2 border-black
			absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
			shadow-none scale-90
			opacity-0 pointer-events-none
	;
}
.hours-table {
	@apply 	w-72 p-5 px-7 flex z-10 shadow-lg overflow-hidden 
			
}
.hours-table > div > h3, .hours-table > div > p {
	flex: 1 1 0;
}

.hours-table p {
	@apply text-ellipsis text-center
}

.show-hours:focus + .hours-table, .show-hours:focus-within, .hours-table:hover {
	@apply 	opacity-100 pointer-events-auto z-10 
			scale-100
	;
}

.hours-table {
	@apply 	w-72 p-5 px-7 flex z-10 shadow-lg overflow-hidden 
			
}
.hours-table > div > h3, .hours-table > div > p {
	flex: 1 1 0;
}

.hours-table p {
	@apply text-ellipsis
}


.open-business-hours {
	@apply 	opacity-100 pointer-events-auto shadow-lg
			scale-100
	;
}

.my-shadow {
	@apply 	cursor-pointer transition-all
			hover:scale-110 active:scale-95
	;
	--shadow-color: hsla(0, 100%, 50%, 0.075);
}

.my-shadow:hover, .my-shadow:active {
    filter: 
        drop-shadow(0 1px 1px hsl(0deg 0% 0% / 0.075))
        drop-shadow(0 4px 4px var(--shadow-color))
        drop-shadow(0 8px 8px var(--shadow-color))
        drop-shadow(0 16px 16px hsl(0deg 0% 0% / 0.075))
        drop-shadow(0 2px 2px hsl(0deg 0% 0% / 0.075));
}

.my-shadow-black {
	--shadow-color: hsla(0, 0%, 0%, 0.075);
}

.business-categories-input {
	@apply max-w-60 
}

.business-categories-input svg {
	@apply cursor-pointer stroke-2 text-gray-600 hover:text-black
}

.business-categories-input ul {
	@apply 	h-fit p-2 flex flex-wrap gap-2 border-2 border-[#1b1b1b] bg-transparent transition-[border]
			focus:outline-none focus:border-b-rose-600 
	;
}

.business-categories-input ul li input, .business-categories-input ul li textarea {
	@apply w-[10ch] p-0 border-none bg-transparent resize-none overflow-hidden
	;
}

#businessCategories {
	@apply disabled:bg-transparent;
	width: 100% !important;
}

.business-categories-input .business-categories-result {
	@apply	max-h-64 flex flex-col flex-nowrap gap-0 shadow-lg z-10
			transition-all duration-300
			opacity-0 pointer-events-none 
			absolute top-[calc(100%-3rem)] -left-[0.15rem] bg-white overflow-hidden overflow-y-scroll
}

.business-categories-input .show-business-categories-input {
	@apply 	hover:top-[calc(100%+0.75rem)] hover:opacity-100 hover:pointer-events-auto
	;
}

.business-categories-input ul li input:focus + .show-business-categories-input {
	@apply 
	top-[calc(100%+0.75rem)] opacity-100 pointer-events-auto
}
.business-categories-input ul li input:disabled + .show-business-categories-input {
	@apply top-[calc(100%-3rem)] opacity-0 pointer-events-none 
}

.business-categories-result li {
	@apply 	p-2 cursor-pointer border-b-2  
			hover:border-b-rose-700
			transition-all duration-300
	;
}

.dialog-img {
	@apply p-4 border-4 border-[#1b1b1b] shadow-lg
}

.dialog-img[open] {
	@apply 	w-[64rem] h-[42rem] flex flex-col relative
}

.preview-image {
	@apply 	w-auto h-auto 
}

</style>