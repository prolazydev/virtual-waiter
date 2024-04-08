<template>
	<div class="create-business-form">
		<form @submit.prevent="handleBusinessCreation">
			<div class="flex flex-col mx-auto">
                <h1 class="w-fit text-3xl font-bold text-[#1b1b1b] uppercase tracking-widest">Create your Business</h1>
                <div class="h-1 w-4 mb-5 bg-[#1b1b1b]"></div>
            </div>

			<div class="relative flex flex-col gap-2">
                <label for="businessName">Business Name</label>
                <input v-model="createBusinessFormData.name" type="text" id="businessName" placeholder="My Virtual Business" required />
            </div>
			<div class="relative flex flex-col gap-2">
				<div class="flex gap-1 items-center">
					<label for="businessAddress">Email address</label>
					<Tooltip _class="w-80" text="This email will be used to communicate with potential costumers, will be a private email so clients will not see the email but you will get notified for every activity on this email">
						<LucideIcon class="mt-1 text-white fill-black" name="Info" :size="18" :stroke-width="2" />
					</Tooltip>
				</div>
				<input v-model="createBusinessFormData.email" type="email" id="businessAddress" placeholder="Your business email address" required />
            </div>
			<div class="relative flex flex-col gap-2">
                <label for="businessPhone">Phone number</label>
                <input v-model="createBusinessFormData.phone" type="text" id="businessPhone" placeholder="+123 45 697 890" />
            </div>
			<div class="relative flex flex-col gap-2">
                <label for="businessDescription">Description</label>
                <input v-model="createBusinessFormData.description" type="text" id="businessDescription" placeholder="The best business there is :)" />
            </div>
			<div class="relative flex flex-col gap-2">
                <label for="businessCity">City</label>
                <input v-model="createBusinessFormData.city" type="text" id="businessCity" placeholder="Tokio" />
            </div>
			<div class="relative flex flex-col gap-2">
                <label for="businessZipCode">Zip Code</label>
                <input v-model="createBusinessFormData.zipCode" type="text" id="businessZipCode" placeholder="13807" />
            </div>
			<!-- TODO: Search for categories to add/remove -->
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
			<div class="relative flex flex-col gap-2">
                <label for="businessWebsite">Website</label>
                <input v-model="createBusinessFormData.website" type="text" id="businessWebsite" placeholder="www.myBusiness.com" />
            </div>
			<div class="relative flex flex-col gap-2">
                <label for="businessStreetAddress">Street Address</label>
                <input v-model="createBusinessFormData.streetAddress!.primary" type="text" id="businessStreetAddress" placeholder="St. DC Boulevard" />
            </div>

			<div class="w-full h-1 my-5 mb-0 bg-black"></div>

			<div class="w-full  flex justify-between">
				<div class="w-64 mt-2 flex flex-col gap-1">
					<Checkbox v-model="useUserEmail" :class="{ 'use-another-email': !useUserEmail }" class="form-checkbox" _id="businessIs24" _label="Use my Email" />
					<p v-if="useUserEmail" class="mt-2 text-gray-400">{{ user.email }}</p>

					<div v-else class="relative flex flex-col gap-2">
						<label for="businessSUserEmail">User Email</label>
						<input v-model="createBusinessFormData.userEmail" type="email" id="businessUserEmail" placeholder="User email" required />
					</div>
				</div>

				<div class="w-64 mt-1 flex flex-col gap-1">
					<div class="flex justify-between ">
						<Checkbox @change="set24hourSchedule" v-model="createBusinessFormData.is24" class="form-checkbox h-8 flex items-center" _id="useUserEmail" _label="Is open 24/7" />
						<div v-if="!createBusinessFormData.is24" class="w-2 h-2 rounded-full my-auto bg-[#1b1b1b]"></div>
						<button v-if="!createBusinessFormData.is24" @click="openSetHours = !openSetHours" class="w-fit h-fit bg-[#1b1b1b] text-white px-2 border-4 border-[#1b1b1b] focus:outline-none focus-visible:border-b-rose-600 active:border-b-white transition-all" type="button">
							Set Hours
						</button>
					</div>

					<button class="show-hours w-fit h-fit bg-[#1b1b1b] text-white px-2 border-4 border-[#1b1b1b] z-50 focus:outline-none focus-visible:border-b-rose-600 active:border-b-white transition-all" type="button">
						Show Hours
					</button>

					<div class="hours-table">
						<h1 class="text-xl font-semibold text-center">Business Hours</h1>
						
						<div v-for="(key) in Object.keys(createBusinessFormData.hours)" :key="key" class="flex">
							<h3 class="font-bold capitalize">{{ key }}:</h3>
							<p v-if="createBusinessFormData.is24">Open 24h</p>
							<p v-else>{{ createBusinessFormData.hours![key as Business24HoursObjectKeys] ? createBusinessFormData.hours![key as Business24HoursObjectKeys] : '00:00-00:00' }}</p>
						</div>
					</div>
				</div>
            </div>
			
			<div :class="{ 'open-business-hours': !createBusinessFormData.is24 && openSetHours }" class="business-hours">
				<h1 class="text-xl font-semibold text-center">Setup Business Hours</h1>
				<div class="w-full h-1 bg-[#1b1b1b]"></div>
				
				<LucideIcon @click="resetHours" class="absolute my-shadow my-shadow-black" name="ListRestart" :stroke-width="2" />
				<LucideIcon @click="openSetHours = false" class="absolute right-4 my-shadow" name="X" :stroke-width="2" />

				<div class="flex flex-col gap-3">
					<div class="flex gap-5 items-center">
						<label class="w-20 mr-5 font-bold text-lg" for="businessMonday">Monday:</label>
						<input v-model="createBusinessFormData.hours!.monday" :readonly="business24Hours.monday" type="text" placeholder="09:00-17:00"> 
						<Checkbox @indeterminate="(e, c) => setIndeterminateClosed(e, c, 'monday')" indeterminate class="form-checkbox" _id="monday" _label="24h | Closed" /> 
					</div>
					<div class="flex gap-5 items-center">
						<label class="w-20 mr-5 font-bold text-lg" for="businessTuesday">Tuesday:</label>
						<input v-model="createBusinessFormData.hours!.tuesday" :readonly="business24Hours.tuesday" type="text" placeholder="09:00-17:00">
						<Checkbox @indeterminate="(e, c) => setIndeterminateClosed(e, c, 'tuesday')" indeterminate class="form-checkbox" _id="tuesday" _label="24h | Closed" />
					</div>
					<div class="flex gap-5 items-center">
						<label class="w-20 mr-5 font-bold text-lg" for="businessWednesday">Wednesday:</label>
						<input v-model="createBusinessFormData.hours!.thursday" :readonly="business24Hours.thursday" type="text" placeholder="09:00-17:00">
						<Checkbox @indeterminate="(e, c) => setIndeterminateClosed(e, c, 'thursday')" indeterminate class="form-checkbox" _id="thursday" _label="24h | Closed" />
					</div>
					<div class="flex gap-5 items-center">
						<label class="w-20 mr-5 font-bold text-lg" for="businessThursday">Thursday:</label>
						<input v-model="createBusinessFormData.hours!.wednesday" :readonly="business24Hours.wednesday" type="text" placeholder="09:00-17:00">
						<Checkbox @indeterminate="(e, c) => setIndeterminateClosed(e, c, 'wednesday')" indeterminate class="form-checkbox" _id="wednesday" _label="24h | Closed" />
					</div>
					<div class="flex gap-5 items-center">
						<label class="w-20 mr-5 font-bold text-lg" for="businessFriday">Friday:</label>
						<input v-model="createBusinessFormData.hours!.friday" :readonly="business24Hours.friday" type="text" placeholder="09:00-17:00">
						<Checkbox @indeterminate="(e, c) => setIndeterminateClosed(e, c, 'friday')" indeterminate class="form-checkbox" _id="friday" _label="24h | Closed" />
					</div>
					<div class="flex gap-5 items-center">
						<label class="w-20 mr-5 font-bold text-lg" for="businessSaturday">Saturday:</label>
						<input v-model="createBusinessFormData.hours!.saturday" :readonly="business24Hours.saturday" type="text" placeholder="09:00-17:00">
						<Checkbox @indeterminate="(e, c) => setIndeterminateClosed(e, c, 'saturday')" indeterminate class="form-checkbox" _id="saturday" _label="24h | Closed" />
					</div>
					<div class="flex gap-5 items-center">
						<label class="w-20 mr-5 font-bold text-lg" for="businessSunday">Sunday:</label>
						<input v-model="createBusinessFormData.hours!.sunday" :readonly="business24Hours.sunday" type="text" placeholder="09:00-17:00">
						<Checkbox @indeterminate="(e, c) => setIndeterminateClosed(e, c, 'sunday')" indeterminate class="form-checkbox" _id="sunday" _label="24h | Closed" />
					</div>
				</div>
			</div>

			<div class="w-full h-1 my-5 mt-3 bg-black"></div>

            <button class="create-business-button" :class="{ 'processing': requestStatus === 'Loading' }" type="submit">
                <p :class="{ 'translate-y-[calc(0%+40px)]': requestStatus === 'Success' || requestStatus === 'Error' }" class="transition-transform duration-500 delay-100">Create</p>
                <LucideIcon :class="{ 'mt-14': requestStatus === 'Success', '-mt-14': requestStatus === 'Idle' || requestStatus === 'Error' }" id="loaderIcon" class="absolute" name="Loader" :size="32" :stroke-width="2" />
                <LucideIcon :class="{ 'process-success': requestStatus === 'Success' }" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-16 transition-all duration-500" id="chefHatIcon" name="ChefHat"  :size="32" :stroke-width="2"  />
                <LucideIcon :class="{ 'process-success': requestStatus === 'Error' }" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-16 transition-all duration-500" id="chefHatIcon" name="CircleX"  :size="32" :stroke-width="2"  />
            </button>
		</form>

		<div class="divider"></div>
		<BusinessPreview v-bind="createBusinessFormData" />
	</div>
</template>

<script lang="ts" setup>
import Checkbox from '@/components/ui/Checkbox.vue';
import type { RequestStatus } from '@/enums/EFromValidations';
import type { BusinessCategory, CreateBusinessModel } from '@/types/business';

const router = useRouter();
const { user } = useUserStore();

const createBusinessFormData = ref<CreateBusinessModel>({
	userId: user.id,
	name: '',
	email: '',
	userEmail: user.email ?? '',
	phone: '',
	description: '',
	is24: false,
	hours: {
		monday: '',
		tuesday: '',
		wednesday: '',
		thursday: '',
		friday: '',
		saturday: '',
		sunday: '',
	},
	city: '',
	categories: [ '' ],
	streetAddress: {
		primary: '',
		secondary: ''
	},
});

const categoryInput = ref('');
const categoriesResult = ref<BusinessCategory[]>([]);

const useUserEmail = ref(true);

const selectedBusinessCategories = ref<string[]>([]);

const openSetHours = ref(false);
const business24Hours = ref({
	monday: false,
	tuesday: false,
	wednesday: true,
	thursday: false,
	friday: false,
	saturday: false,
	sunday: false
});

const requestStatus = ref<RequestStatus>('Idle');

type Business24HoursObjectKeys = keyof typeof business24Hours.value;

onMounted(() => {


	const textarea = document.querySelector<HTMLTextAreaElement>('#businessCategories')!;

	// autosize(textarea);
	autosizeWidth(textarea)
});

watch(() => useUserEmail.value, (newValue: boolean) => newValue 	
	? createBusinessFormData.value.userEmail = user.email 
	: createBusinessFormData.value.userEmail = ''
)

const autosizeWidth = async (e: Event | HTMLTextAreaElement) => {
	if ( e instanceof Event ) {
		const length = (e.target as HTMLInputElement).value.length;

		(e.target as HTMLInputElement).style.width = `${Math.max(20, length + 3)}ch`;
		
	} else 
		e.style.width = Math.max(20, e.value.length + 3) + 'ch';

	await debounceSearchCategories();
}

const debounceSearchCategories = useDebounceFn(async () => {
	const { response, data } = await myFetch(`business_category/name/${categoryInput.value}`);
	if ( response.value?.ok ) {
		categoriesResult.value = data.value;
	}
}, 500);

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
}

const handlePop = () => {
	if (categoryInput.value.length === 0 && selectedBusinessCategories.value.length > 0) 
		selectedBusinessCategories.value.pop();
}

const addCategory = (name: string) => {
	if (selectedBusinessCategories.value.length === 2) 
		categoryInput.value = '';
	if (selectedBusinessCategories.value.length < 3) {
		selectedBusinessCategories.value.push(name)
		createBusinessFormData.value.categories = selectedBusinessCategories.value;
		return 
	}
}

const setAllHours = (hour: string, boolVal: boolean = true) => {
	Object.keys(createBusinessFormData.value.hours!).forEach((key) => {
		createBusinessFormData.value.hours![key as Business24HoursObjectKeys] = hour;
		business24Hours.value[key as Business24HoursObjectKeys] = boolVal;
	})

	document.querySelectorAll<HTMLInputElement>('.business-hours .form-checkbox input[type="checkbox"]')
		.forEach((el) => {
			el.checked = boolVal;
			el.readOnly = false;
			el.indeterminate = false;
		}); 
}

const setIndeterminateClosed = (value: string, checked: boolean, key: string) => {
	if (!value && checked) {
		createBusinessFormData.value.hours![key as Business24HoursObjectKeys] = '24';
		business24Hours.value[key as Business24HoursObjectKeys] = true;
	} 
	else if (value && value.length > 0) {
		createBusinessFormData.value.hours![key as Business24HoursObjectKeys] = 'Closed';
		business24Hours.value[key as Business24HoursObjectKeys] = true;
	} 
	else {
		createBusinessFormData.value.hours![key as Business24HoursObjectKeys] = '';	
		business24Hours.value[key as Business24HoursObjectKeys] = false;
	}
}

const set24hourSchedule = () => createBusinessFormData.value.is24 
	? setAllHours('')
	: setAllHours('00:00-00:00', false);
	
const resetHours = () => setAllHours('', false)

const handleBusinessCreation = async () => {
    requestStatus.value = 'Loading';
	try {
		const { response, data, error } = await myFetch<{id: string}>('/business', createBusinessFormData.value, { method: 'POST' });

		if ( response.value?.ok ) {
			console.log(data.value);
			requestStatus.value = 'Success';

			setTimeout(() => tostRouterTo(router, `/business_confirmation/${data.value!.id}`, 'Business created!'), 1250);
		} else {
			requestStatus.value = 'Error';
			setTimeout(() => requestStatus.value = 'Idle', 1250);
			console.log(response.value?.status, data.value);
			console.log(error);
		}
	} catch (error) {
		console.log(error);
	}
}
</script>

<style scoped>
.create-business-form {
	@apply h-fit w-full my-5 px-10 flex;
}

.create-business-form form {
	@apply max-w-[39rem] py-10 px-10 flex flex-wrap gap-x-6 gap-y-2 relative border-4 border-[#1b1b1b]
    ;
	
}

.create-business-form form input, .create-business-form form textarea {
	@apply  w-64 p-2 border-2 border-[#1b1b1b] bg-transparent transition-[border]
			focus:outline-none focus:border-b-rose-600 

			read-only:bg-gray-200 read-only:cursor-not-allowed
			focus:read-only:border-b-[#1b1b1b]
    ;
}

/* for readonly style */
.create-business-form form input[readonly] {
	@apply  bg-gray-200
	;
}

.create-business-form h1 {
	@apply whitespace-nowrap
	;
}

.form-checkbox {
	@apply pl-6 whitespace-nowrap 
	;
}

.business-categories-input {
	@apply max-w-64 
}

.business-categories-input ul {
	@apply 	w-64 h-fit p-2 flex flex-wrap gap-2 border-2 border-[#1b1b1b] bg-transparent transition-[border]
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
	@apply	max-h-64 flex flex-col flex-nowrap gap-0 shadow-lg
			transition-all duration-300
			opacity-0 pointer-events-none 
			absolute top-[calc(100%-3rem)] -left-[0.15rem] bg-white overflow-hidden overflow-y-scroll z-[500]
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

.use-another-email {
	@apply line-through text-gray-400
}

.business-hours, .hours-table {
	@apply 	h-fit py-5 pt-3 px-5 bg-[#f9f9f9] flex flex-col gap-5 transition-all duration-300
			border-2 border-black
			absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+3rem)]
			shadow-none scale-90
			opacity-0 pointer-events-none
	;
}

.open-business-hours {
	@apply 	opacity-100 pointer-events-auto shadow-lg
			scale-100
	;
}

.create-business-button {
    @apply  h-fit mx-auto p-2 bg-[#1b1b1b] text-white uppercase tracking-widest font-semibold border-4 border-[#1b1b1b]
            relative overflow-hidden transition-all
            focus:outline-none
            focus-visible:border-b-rose-600
            active:border-b-white
    ;
}

.create-business-button #loaderIcon {
    @apply  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700
}

.processing p {
    @apply translate-y-[calc(0%+40px)]
}

.processing #loaderIcon {
    @apply mt-0
    ;
    animation: loading 1s ease 0s infinite forwards;
}
@keyframes loading {
    0% {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(90deg);
    }
}

.process-success  {
    @apply -translate-y-1/2
}

.divider {
	@apply w-2 mx-10 bg-[#1b1b1b]
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

.hours-table {
	@apply 	w-72 p-5 px-7 flex z-10 shadow-lg overflow-hidden 
			
}
.hours-table > div > h3, .hours-table > div > p {
	flex: 1 1 0;
}

.hours-table p {
	@apply text-ellipsis
}

.show-hours:focus + .hours-table, .show-hours:focus-within, .hours-table:hover {
	@apply 	opacity-100 pointer-events-auto z-10 shadow-lg
			scale-100
	;
}

.process-success  {
    @apply -translate-y-1/2
}

</style>