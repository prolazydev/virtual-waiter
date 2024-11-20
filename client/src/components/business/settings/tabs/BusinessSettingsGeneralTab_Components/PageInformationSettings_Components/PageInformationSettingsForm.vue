<template>
    <div class="input-group mt-5">
        <!-- TODO: create a search bar to search up a specific setting -->
        <div class="flex gap-5 items-center">
            <div class="relative">
				<input 
					v-model="settingSearchInput"
					type="text" 
					placeholder="Search for a Setting"
					class="form-input w-52 pr-8"
				/>

				<transition name="fade">
					<button  
						v-if="settingSearchInput.length > 0"
						class="absolute top-2.5 right-1.5" type="button"
					>
						<LucideIcon 
							@click="settingSearchInput = ''"
							class="hover:scale-110 active:scale-95 transition-all hover-red-button"
							name='X' 
							size="24" 
							:stroke-width="2" 
						/>
					</button>
				</transition>
			</div>

            <div class="w-32 relative">
                <transition name="fade">
                    <p 
						v-if="settingSearchInput.length > 0" 
						:key="settingSearchInput.length" 
						class="w-full font-semibold absolute-center"
					>
                        Found {{ foundFields }} {{ foundFields > 1 ? 'results' : 'result' }}
                    </p>
                </transition>
            </div>
            
        </div>
        
        <div class="flex gap-10">
            <!-- TODO: Add an info widget "i" (for each selected input like Email Address) to explain the purpose of each info -->
            <!-- TODO: setup profile, takeout, delivery -->
            <template v-for="(section) in filteredFields" :key="section.id">
                <section class="options-section">
                    <h2 class="pb-3 text-xl font-semibold border-b border-b-black">{{ section.name }}</h2>

                    <template v-if="filteredSingleFields(section.fields).length > 0">
                        <div class="max-w-[27rem] flex flex-wrap justify-between">
                            <template v-for="(field) in filteredSingleFields(section.fields)" :key="field.id">
                                <EditFormPart 
                                    v-if="field.type === 'text' && field.fieldType === 'field'"
                                    @toggle-edit="toggleEdit(field.prop as BusinessFormFieldKeys)"
                                    :state="editFormState(businessFormFields[field.prop as BusinessFormFieldKeys].state)"
                                    :id="field.id"
                                    :title="field.label"
                                    class="form-part min-w-52"
                                >
                                    <input 
                                        @keyup.enter="toggleEdit(field.prop as BusinessFormFieldKeys, 'edit')"
                                        v-model="businessFormFields[field.prop as BusinessFormFieldKeys].value"
                                        :disabled="businessFormFields[field.prop as BusinessFormFieldKeys].state === 'idle'"
                                        :id="field.id" 
                                        :placeholder="field.placeholder"
                                        type="text" 
                                        class="form-input"
                                        autocomplete="off"
                                    />

                                    <template #footer>
                                        <div class="flex justify-end gap-5">
                                            <button @click="toggleEdit(field.prop as BusinessFormFieldKeys)">
                                                Cancel
                                            </button>
                                            <button @click="toggleEdit(field.prop as BusinessFormFieldKeys, 'edit')" class="form-button-1">
                                                <CustomLoader :state="editState(businessFormFields[field.prop as BusinessFormFieldKeys].state)" class="edit-button">
                                                    Save
                                                </CustomLoader>
                                            </button>
                                        </div>
                                    </template>
                                </EditFormPart>

                                <EditFormPart 
                                    v-else-if="field.type === 'textarea'"
                                    @toggle-edit="toggleEdit('description')"
                                    :state="editFormState(businessFormFields.description.state)"
                                    class="form-part w-full"
                                    id="businessDescription"
                                    title="Description"
                                >
                                    <textarea 
                                        @keydown.shift.enter.prevent.exact="toggleEdit('description', 'edit')"
                                        v-model="businessFormFields.description.value"
                                        :disabled="businessFormFields.description.state === 'idle'"
                                        class="form-input"
                                        id="businessDescription" 
                                        placeholder="MaNemaJeff"
                                        rows="7"
                                    ></textarea>

                                    <template #footer>
                                        <div class="flex justify-end gap-5">
                                            <button @click="toggleEdit('description')">
                                                Cancel
                                            </button>
                                            <button @click="toggleEdit('description', 'edit')" class="form-button-1">
                                                <CustomLoader :state="editState(businessFormFields.description.state)" class="edit-button">
                                                    Save
                                                </CustomLoader>
                                            </button>
                                        </div>
                                    </template>
                                </EditFormPart>

                                <template v-else-if="field.type === 'file'">
                                    <MyDialog 
                                        :_class="`${field.id}-dialog p-7 gap-10 dialog-body-full`" 
                                        :title="`Setup ${field.label}`" 
                                        size="lg"
                                        class="min-w-52"
                                    >
                                        <label :for="field.id">{{ field.label }}</label>
                                        <button @click="toggleDialog(`.${field.id}-dialog`)" :id="field.id" class="form-button-1" type="button">
                                            Setup {{ field.label }}
                                        </button>
                                       
                                        <template #body>
                                            <div class="w-full mt-5 flex flex-col gap-5 overflow-hidden">
                                                <template v-if="businessFormFields[field.prop as BusinessFormFieldKeys].state === 'preview' || (businessFormFields[field.prop as BusinessFormFieldKeys].value as string)?.length > 0">
                                                    <label :for="`${field.id}Setup`">
                                                        <img 
                                                            :src="parseBase64Image(businessFormFields[field.prop as BusinessFormFieldKeys].value as string)" 
                                                            :alt="field.label"
                                                            class="hover:shadow-lg shadow-black hover:scale-[.990] scale-[.975] active:scale-[.975] transition-all duration-300"
                                                        />
                                                    </label>
                                                </template>
                                                
                                                <label v-else class="w-full h-full flex my-hover-dark-shadow overflow-hidden" :for="`${field.id}Setup`">
                                                    <LucideIcon name="ImagePlus" size="64" class="m-auto stroke-2 " />
                                                </label>
    
                                                <input 
                                                    @change="(e) => handleFileUpload(e, field.prop as BusinessFormFieldKeys)"
                                                    :id="`${field.id}Setup`"
                                                    type="file" 
                                                    accept="image/*"
                                                    class="hidden" 
                                                />
    
                                                <div class="w-full h-[1px] mb-3 bg-black"></div>
                                            </div>
                                        </template>

                                        <template #footer>
                                            <div class="w-full flex justify-end gap-5">
                                                <button @click="toggleDialogEdit(`.${field.id}-dialog`, field.prop as BusinessFormFieldKeys)">
                                                    Cancel
                                                </button>
                                                <button @click="toggleDialogEdit(`.${field.id}-dialog`, field.prop as BusinessFormFieldKeys, 'edit')" class="form-button-1">
                                                    <CustomLoader :state="editState(businessFormFields[field.prop as BusinessFormFieldKeys].state)" class="edit-button">
                                                        Save
                                                    </CustomLoader>
                                                </button>
                                            </div>
                                        </template>
                                    </MyDialog>
                                </template>
                            </template>

							<!-- TODO: implement dropdown search results of street addresses -->
							<template v-for="(field) in filteredDropdownFields(section.fields)" :key="field.id">
								<EditFormPart
									v-if="field.fieldType === 'dropdown-field' && field.label === 'Location'"
									@toggle-edit="toggleEdit(field.prop as BusinessFormFieldKeys)"
									:state="editFormState(businessFormFields[field.prop as BusinessFormFieldKeys].state)"
                                    :id="field.id"
                                    :title="field.label"
									class="form-part min-w-52"
								>
									<DebounceSearch
										@debounce-fn="debounceSearchLocation"
										v-model="businessFormLocationField"
										input-type="text"
										:id="field.id"

										:disabled="businessFormFields[field.prop as BusinessFormFieldKeys].state === 'idle'"
										:placeholder="field.placeholder"
										input-class="form-input"
									>
										<template #bottom>
											<ul :class="{ 'show-search-results': searchResults && searchResults.features && searchResults.features.length > 0 && businessFormFields[field.prop as BusinessFormFieldKeys].state !== 'idle' }" 
												class="search-result" 
											>
												<li v-for="item in searchResults.features" :key="item.properties.osm_id">
													<div 
														@click="selectLocation(item)"
														role="button" 
														class="capitalize"
													> 
														<b>{{ `${item.properties.city}: ${item.properties.name}` }}</b>

														{{ item.properties.country ? ` - ${item.properties.country ?? '' }` : '' }}
													</div>
												</li>
											</ul>
										</template>
									</DebounceSearch>

									<template #footer>
										<div class="flex justify-end gap-5">
											<button @click="toggleEdit(field.prop as BusinessFormFieldKeys)">
												Cancel
											</button>
											<button @click="toggleEdit(field.prop as BusinessFormFieldKeys, 'edit')" class="form-button-1">
												<CustomLoader :state="editState(businessFormFields[field.prop as BusinessFormFieldKeys].state)" class="edit-button">
													Save
												</CustomLoader>
											</button>
										</div>
									</template>
								</EditFormPart>
							</template>
                        </div>
                    </template>

                    <template v-for="(nestingField) in filteredNestedFields(section.fields)" :key="nestingField.id">
                        <MyDialog :_class="`${nestingField.id}-dialog p-7 gap-10`" :title="`Setup ${nestingField.label}`" :size="nestingField.size ?? 'custom'">
                            <label :for="nestingField.id">{{ nestingField.label }}</label>
                            <button @click="toggleDialog(`.${nestingField.id}-dialog`)" :id="nestingField.id" class="form-button-1" type="button">
                                Setup {{ nestingField.label }}
                            </button>

                            <template #body>
                                <div class="mt-3 mb-2 flex flex-col gap-5">
                                    <div class="flex gap-5">
                                        <div v-for="(field) in nestingField.fields" :key="field.id" class="flex flex-col gap-2">
                                            <template v-if="field.fieldType != 'field'">
                                                <template v-for="(overNestingField) in field.fields" :key="overNestingField.id">
                                                    <label :for="overNestingField.id">{{ overNestingField.label }}</label>
                                                    <template v-if="overNestingField.fieldType === 'field'">
                                                        <!-- @vue-expect-error - Too unbothered to TS -->
                                                        <input 
                                                            v-model="businessFormFields[nestingField.prop].value![field.prop][overNestingField.prop]" 
                                                            class="form-input"
                                                            :type="overNestingField.type" 
                                                            :id="overNestingField.id" 
                                                            :placeholder="overNestingField.placeholder" 
                                                        />
                                                    </template>
                                                </template>
                                            </template>
                                        </div>
                                    </div>

                                    <div class="w-full h-[1px] bg-black"></div>
                                </div>
                                
                            </template>

                            <template #footer>
                                <div class="w-full flex justify-end gap-5">
                                    <button @click="toggleDialogEdit(`.${nestingField.id}-dialog`, nestingField.prop as BusinessFormFieldKeys)">
                                        Cancel
                                    </button>
                                    <button @click="toggleDialogEdit(`.${nestingField.id}-dialog`, nestingField.prop as BusinessFormFieldKeys, 'edit')" class="form-button-1">
                                        <CustomLoader :state="editState(businessFormFields.streetAddress.state)" class="edit-button">
                                            Save
                                        </CustomLoader>
                                    </button>
                                </div>
                            </template>
                        </MyDialog>
                    </template>

                    <template v-for="(field, index) in filteredNestedSections(section.fields)" :key="index">
                        <h2 class="pb-3 text-xl font-semibold border-b border-b-black">{{ field.name }}</h2>

                        <div class="flex justify-between">
                            <template v-for="(nestedField) in field.fields" :key="nestedField.id">
                                <template v-if="nestedField.fieldType === 'nested' && nestedField.prop === 'categories'">
                                    <div class="flex justify-between">
                                        <MyDialog :_class="`${nestedField.id}-dialog w-[28rem] p-7 gap-10 overflow-visible`" :title="`Setup ${nestedField.label}`" :size="nestedField.size ?? 'custom'">
                                            <div class="form-part flex flex-col gap-1">
                                                <label :for="nestedField.id">{{ `Setup ${nestedField.label}` }}</label>
                                                <button @click="toggleDialog(`.${nestedField.id}-dialog`)" class="form-button-1 min-w-52" :id="nestedField.id" type="button">
                                                    Setup {{ nestedField.label }}
                                                </button>
                                            </div>

                                            <template #body>
                                                <div class="w-full mt-3 mb-2 flex flex-col gap-2">
                                                    <transition-group 
                                                        name="list" 
                                                        tag="span" 
                                                        class="flex gap-5 flex-wrap overflow-hidden transition-all"
                                                        id="selectedCategoriesList"
                                                    >
                                                        <li v-if="businessFormFields.categories.value!.length === 0" class="py-1 flex text-gray-600 border border-transparent">
                                                            <span >No categories selected</span>
                                                        </li>
                                                        <li v-for="(item, index) in businessFormFields.categories.value" 
                                                            :key="item"
                                                            id=""
                                                            class="px-2 py-1 flex gap-2 border-b-2 border-b-black items-center hover:border-b-rose-600 transition-all"
                                                        >
                                                            <span>{{ item }}</span>
                                                            <span class="w-4 h-5 relative">
                                                                <LucideIcon 
                                                                    @click="popCategory(index)" 
                                                                    class="cursor-pointer absolute top-1/2 -translate-y-1/2 hover:stroke-rose-600 hover:scale-110 transition-all" 
                                                                    name="X" 
                                                                    :size="20" 
                                                                />
                                                            </span>
                                                        </li>
                                                    </transition-group>

                                                    <div class="business-categories-input relative flex flex-col gap-2">
                                                        <label for="businessCategories">Business Categories</label>
                                                        <input 
                                                            @input="debounceSearchCategories" 
                                                            @keydown.backspace="popCategory()" 
                                                            v-model="categoryInput" 
                                                            :disabled="businessFormFields.categories.value!.length >= 3 " 
                                                            :placeholder="businessFormFields.categories.value!.length < 3 ? 'Business Categories' : 'Please remove a category to add a new one'" 
                                                            id="businessCategories"
                                                            class="form-input w-full"
                                                            autocomplete="off"
                                                        />

                                                        <ul 
															:class="{ 'show-business-categories-input': categoriesResult.length > 0 && categoryInput.length > 0 }" 
															class="business-categories-result" 
														>
                                                            <li 
																v-for="(item, index) in categoriesResult" 
																:key="index" 
																@click="addCategory(item.name)" 
																class="flex gap-1"
															>
                                                                <p v-if="item.parentCategories[0]" class="capitalize">{{ item.parentCategories[0] }} - </p> <span v-html="formatText(item.name)"></span>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div class="w-full h-[1px] mt-5 bg-black"></div>
                                                </div>
                                            </template>

                                            <template #footer>
                                                <div class="w-full flex justify-end gap-5">
                                                    <button @click="toggleDialogEdit(`.${nestedField.id}-dialog`, 'categories')">
                                                        Cancel
                                                    </button>
                                                    <button @click="toggleDialogEdit(`.${nestedField.id}-dialog`, 'categories', 'edit')" class="form-button-1">
                                                        <CustomLoader :state="editState(businessFormFields.categories.state)" class="edit-button">
                                                            Save
                                                        </CustomLoader>
                                                    </button>
                                                </div>
                                            </template>
                                        </MyDialog>
                                    </div>
                                </template>

                                <template v-else-if="nestedField.fieldType === 'nested' && nestedField.prop === 'hours'">
                                    <MyDialog :_class="`${nestedField.id}-dialog w-[32rem] p-7`" :title="`Setup ${nestedField.label}`" :size="nestedField.size ?? 'custom'">
                                        <div class="form-part flex flex-col gap-1">
                                            <label :for="nestedField.id">{{ `Setup ${nestedField.label}` }}</label>
                                            <button @click="toggleDialog(`.${nestedField.id}-dialog`)" class="form-button-1 min-w-52" :id="nestedField.id" type="button">
                                                Setup {{ nestedField.label }}
                                            </button>
                                        </div>

                                        <template #body>
                                            <div class="mt-5 mb-2 flex flex-col gap-5">
                                                <div class="flex flex-col gap-3">
                                                    <div v-for="(day) in (Object.keys(businessFormFields.hours.value!) as Days[])" :key="day" class="flex gap-5 items-center">
                                                        <label :for="`business${day}`" class="w-20 mr-5 font-bold text-lg capitalize">{{ day }}:</label>
                                                        <input 
                                                            v-model="businessFormFields.hours.value![day]" :readonly="business24Hours[day]" 
                                                            :id="`business${day}`"
                                                            class="form-input"
                                                            type="text" 
                                                            placeholder="09:00-17:00"
                                                        >
                                                    
                                                        <Checkbox 
                                                            @indeterminate="(isIndeterminate, checked) => setIndeterminateClosed(isIndeterminate, checked!, day)" 
                                                            indeterminate 
                                                            class="form-checkbox" 
                                                            :_id="day" 
                                                            _label="24h | Closed" 
                                                        /> 
                                                    </div>
                                                </div>

                                                <div class="flex flex-col gap-3">
                                                    <Checkbox 
                                                        @change="set24hourSchedule" 
                                                        v-model="businessFormFields.is24.value" 
                                                        class="form-checkbox h-8 flex items-center" 
                                                        _id="useUserEmail" 
                                                        _label="Is open 24/7" 
                                                    />

                                                    <div class="w-full h-[1px] bg-black"></div>
                                                </div>
                                            </div>
                                        </template>

                                        <template #footer>
                                            <div class="w-full flex justify-end gap-5">
                                                <button @click="toggleDialogEdit(`.${nestedField.id}-dialog`, [ 'hours', 'is24' ])">
                                                    Cancel
                                                </button>
                                                <button @click="toggleDialogEdit(`.${nestedField.id}-dialog`, [ 'hours', 'is24' ], 'edit')" class="form-button-1">
                                                    <CustomLoader :state="editState(businessFormFields.hours.state)" class="edit-button">
                                                        Save
                                                    </CustomLoader>
                                                </button>
                                            </div>
                                        </template>
                                    </MyDialog>
                                </template>
                            </template>
                        </div>
                    </template>
                </section>

                <template v-if="filteredFields.findIndex(x => x.id === section.id) !== filteredFields.length -1">
                    <div class="w-[1px] bg-black"></div>
                </template>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { WatchStopHandle } from 'vue';

import type { LoadingState } from '@/types';
import type { Business, BusinessCategory, BusinessFormFieldKeys, BusinessFormFields, BusinessLocationData, Days } from '@/types/models/business';
import type { FormField } from '@/constants/business/settings/pageInformation';

import { placeholderPageSettings } from '@/constants/business/settings';
import { sections } from '@/constants/business/settings/pageInformation';

const router = useRouter();
const { params } = useRoute('business-dashboard-settings');

const { updateBusiness } = businessService();
const { toggleDialog, isDialogClosed } = myDialog();
const { areObjectsEqual } = myEqualComparator();
const loader = useLoader();

const business = ref<Business>({} as Business);
const businessFormFields = ref<BusinessFormFields>(placeholderPageSettings);
const businessFormLocationField = ref();

const settingSearchInput = ref('');

const categoryInput = ref('');
const categoriesResult = ref<BusinessCategory[]>([]);

const searchResults = ref<BusinessLocationData>({} as BusinessLocationData);

const business24Hours = ref({
	monday: false,
	tuesday: false,
	wednesday: false,
	thursday: false,
	friday: false,
	saturday: false,
	sunday: false
});

const cpuCores = ref<number>(0);

let unWatchHours: WatchStopHandle;

onMounted(() => {
    loader.finishLoader();

    if (businessFormFields.value.is24.value) {
        setAllHours('');
    }

    unWatchHours = watch(() => businessFormFields.value.is24.value, (val) => val ? setAllHours('24') : null);

    if (typeof navigator.hardwareConcurrency !== 'undefined') {
        cpuCores.value = navigator.hardwareConcurrency;
    } else {
        console.warn('The hardwareConcurrency API is not supported by this browser.');
        cpuCores.value = 1; // Fallback to 1 core if the API is not supported
    }
}); 

onUnmounted(() => {
    unWatchHours();
});

const filteredSingleFields = (fields: FormField[]) => {
    if (fields && fields.length > 0 && fields.some(f => f.fieldType === 'field' || f.fieldType === 'dropdown-field'))
        return fields.filter(f => f.fieldType === 'field' || f.fieldType === 'dropdown-field')
    else
        return [];
}

const filteredDropdownFields = (fields: FormField[]) => {
	if (fields && fields.length > 0 && fields.some(f => f.fieldType === 'dropdown-field'))
		return fields.filter(f => f.fieldType === 'dropdown-field')
	else
		return [];
}

const filteredNestedFields = (fields: FormField[]) => {
    if (fields && fields.length > 0 && fields.some(f => f.fieldType === 'nested'))
        return fields.filter(f => f.fieldType === 'nested')
    else
        return [];
}

const filteredNestedSections = (fields: FormField[]) => {
    if (fields && fields.length > 0 && fields.some(f => f.fieldType === 'nested-section'))
        return fields.filter(f => f.fieldType === 'nested-section')
    else
        return [];
}

const filteredFields = computed(() => {
    const query = settingSearchInput.value.toLowerCase();

    const filteredSections = sections.map((section) => {
        const matchingFields = searchFields(section.fields, query);
       
        return matchingFields.length > 0 ? { ...section, fields: matchingFields } : null;
    }).filter(section => section !== null);

    return filteredSections;
});

const foundFields = computed(() => {
    // const fieldsFromSectionsCount = filteredFields.value.reduce((acc, section) => acc + section.fields.length, 0);
    // const fieldsFromNestedSectionsCount = filteredFields.value.map(section => section.fields.filter(field => field.fieldType === 'nested-section').length).reduce((acc, val) => acc + val, 0);

    // return fieldsFromSectionsCount + fieldsFromNestedSectionsCount;

    // NOTE: Possibly remove the above code and use the below code instead since it's a bit more perfomant
    return filteredFields.value.reduce((acc, section) => {
        acc + section.fields.length;
        for (const field of section.fields) {
            if (field.fieldType === 'nested-section') {
                acc += field.fields.length;
            } else {
                acc += 1;
            }
        }
        return acc;
    }, 0);
});

const searchFields = (fields: FormField[], query: string): FormField[] => {
    return fields
        .map(field => {
            if (field.fieldType === 'nested' || field.fieldType === 'nested-section') {
                // Check if the label of the nested field itself matches
                const parentMatches = field.label.toLowerCase().includes(query) || field.id.toLowerCase().includes(query);

                // Search within nested fields
                const matchingNestedFields = searchFields(field.fields, query);

                // If any nested fields match or the parent field matches, keep the entire nested structure
                if (matchingNestedFields.length > 0 || parentMatches) {
                    return {
                        ...field,
                        match: parentMatches,
                    };
                }
                return null; // No match found in this nested structure
            } else if (field.fieldType === 'field' || field.fieldType === 'dropdown-field') {
                // Check if this simple field matches the query
                if (field.label.toLowerCase().includes(query) || field.placeholder?.toLowerCase().includes(query) || field.prop.toLowerCase().includes(query))
                    return { ...field };
                return null;
            } else {
                return null;
            }
        })
        .filter(field => field !== null) as FormField[];
}

const selectLocation = (item: BusinessLocationData['features'][0]) => {
	businessFormFields.value.location.value = { 
		name: item.properties.name ?? '',
		city: item.properties.city ?? '', 
		state: item.properties.state ?? '', 
		zipCode: item.properties.postcode ?? '', 
		id: item.properties.osm_id.toString()! 
	};

	searchResults.value = { features: [], type: '' } as BusinessLocationData;
	businessFormLocationField.value = item.properties.name ?? item.properties.city ?? '';
}

const debounceSearchLocation = async (searchQuery: string) => {
	try {
		loader.startLoader();
        const encodedQuery = encodeURIComponent(searchQuery);
        const url = `https://photon.komoot.io/api/?q=${encodedQuery}&lat=42.67272&lon=21.16688`;
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error('Failed to fetch location data');
		}

		searchResults.value = await res.json();
		console.log(searchResults.value);
	} catch (error) {
        console.error('Location search failed:', error);
	} finally {
		loader.finishLoader();
	}
}

const editFormState = computed(() => {
    return (state: LoadingState | 'edit' | 'preview') => {
        switch (state) {
            case 'edit':
            case 'loading':
            case 'success':
            case 'preview':
            case 'error':
                return 'edit';
            default:
                return 'idle';
        }
    };
});

const editState = computed(() => {
    return (state: LoadingState | 'edit' | 'preview') => {
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
    };
});

watch(() => businessFormFields.value.hours.value!, (val) => {
    const keys = Object.keys(val) as Days[];

    if (keys.every((key) => val[key] === '24'))
        businessFormFields.value.is24.value = true;
    else 
        businessFormFields.value.is24.value = false;
}, 
{ deep: true });

const handleGetBusiness = async () => {
	try {
        const { getBusinessSelfById } = businessService();

        const { response, statusCode, data } = await getBusinessSelfById(params.id)
        if (response.value!.ok && data.value) {
            business.value = data.value;
			// TODO: improve typing on business model
			businessFormLocationField.value = (business.value.location as any).name ?? '';

            const { cloned: clonedBusiness } = useCloned(business.value);

            const keys = Object.keys(businessFormFields.value) as (keyof BusinessFormFields)[];
            for (const key of keys) 
                if (business.value[key]) 
                    businessFormFields.value[key].value = clonedBusiness.value[key]
        }

		switch (statusCode.value) {
			case 404:
				return await router.push({ name: 'not-found' });
			case 400:
				return await router.push({ name: '/error/bad-request' });
			// Add additional cases as needed
			default:
				return // Handle other status codes if necessary
		}
	} catch (error) {
		console.error(error);
	} finally {
        loader.finishLoader();
    }
};
await handleGetBusiness();

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
    if (businessFormFields.value.categories.value) {
        if (businessFormFields.value.categories.value.length === 3) {
            categoryInput.value = '';
            return;
        };

        if (businessFormFields.value.categories.value.length < 3) {
            businessFormFields.value.categories.value.push(name);
            // businessFormFields.value.categories.value?.push(name);

            if (businessFormFields.value.categories.value.length === 3) 
                categoryInput.value = '';
        }
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

const popCategory = (index: number = -1) => {
    if (businessFormFields.value.categories.value) {
        if (index < 0) {
            if (categoryInput.value.length === 0 && businessFormFields.value.categories.value.length > 0) {
                return businessFormFields.value.categories.value.pop();
            }
        }
        else 
            businessFormFields.value.categories.value.splice(index, 1);
    }
};

const set24hourSchedule = () => {
    businessFormFields.value.is24.value! 
        ? setAllHours('24')
        : setAllHours('', false);
}

const setAllHours = (hour: string, boolVal: boolean = true) => {
	Object.keys(businessFormFields.value.hours.value!).forEach((key) => {
		businessFormFields.value.hours.value![key as Days] = hour;
		business24Hours.value[key as Days] = boolVal;
	});

	document.querySelectorAll<HTMLInputElement>('.hours-dialog input[type="checkbox"]')
		.forEach((el) => {
			el.checked = boolVal;
			el.readOnly = false;
			el.indeterminate = false;
		});
};

const setIndeterminateClosed = (isIndeterminate: string, checked: boolean, day: Days) => {
	if (!isIndeterminate && checked) {
		businessFormFields.value.hours.value![day] = '24';
		business24Hours.value[day] = false;
	}
	else if (isIndeterminate && isIndeterminate.length > 0) {
		businessFormFields.value.hours.value![day] = 'Closed';
		business24Hours.value[day] = true;
	}
	else {
		businessFormFields.value.hours.value![day] = '';
		business24Hours.value[day] = false;
	}
};

const handleFileUpload = (e: Event, prop: BusinessFormFieldKeys) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            businessFormFields.value[prop].value = reader.result as string;

            businessFormFields.value[prop].state = 'preview';
        }
    }
}

const parseBase64Image = (e: string) => {
    return e.startsWith('data') ? e : `data:image/png;base64,${e}`;
}

const toggleEdit = async (prop: BusinessFormFieldKeys[] | BusinessFormFieldKeys, action: 'cancel' | 'edit' = 'cancel') => {
    if (Array.isArray(prop) ) {
        prop.forEach((el) => console.log(el))
    } else {
        if (action === 'cancel') {
            if (businessFormFields.value[prop].state === 'idle')
                businessFormFields.value[prop].state = 'edit';
            else
                businessFormFields.value[prop].state = 'idle';

            // reset that inputs value on cancel if it was changed
            if (businessFormFields.value[prop].value !== business.value[prop])
                businessFormFields.value[prop].value = business.value[prop];
        }

        else if (action === 'edit' && businessFormFields.value[prop].value !== business.value[prop]) {
            businessFormFields.value[prop].state = 'loading';

            const { response, statusCode, data } = await updateBusiness(business.value._id, { [prop]: businessFormFields.value[prop].value });

            if (response.value!.ok && data.value) {
                business.value = data.value;

                loader.finishLoader();
                businessFormFields.value[prop].state = 'success';
                useTost('Business Information updated successfully!', 2000);

                setTimeout(() => {
                    if (businessFormFields.value[prop].state === 'edit' || businessFormFields.value[prop].state === 'loading' || businessFormFields.value[prop].state === 'success')
                        businessFormFields.value[prop].state = 'idle';
                }, 2000);
            } else {
                switch (statusCode.value) {
                    case 404:
                        return await router.push({ name: 'not-found' });
                    case 400:
                        return await router.push({ name: '/error/bad-request' });
                    // Add additional cases as needed
                    default:
                        return; // Handle other status codes if necessary
                }
            }
        }
    }
}

const toggleDialogEdit = async (dialogElement: string, prop: BusinessFormFieldKeys[] | BusinessFormFieldKeys, action: 'cancel' | 'edit' = 'cancel') => {
    if (action === 'cancel') {
        handleReset(prop);
    	toggleDialog(dialogElement);
    } else {
        await handleEdit(dialogElement, prop);
    }
}

/** Resets the input to it's original value from business */
const handleReset = (prop: BusinessFormFieldKeys | BusinessFormFieldKeys[]) => {
    if (Array.isArray(prop)) 
        prop.forEach((param) => reset(param));
    else 
        reset(prop);
}
const reset = (prop: BusinessFormFieldKeys) => {
    if (!areObjectsEqual(businessFormFields.value[prop].value, business.value[prop])) {
        const { cloned } = useCloned(business.value[prop]);

        businessFormFields.value[prop].value = cloned.value;
    }
}

const handleEdit = async (dialogElement: string, prop: BusinessFormFieldKeys | BusinessFormFieldKeys[]) => {
    try {
        let editObj: { [key: string]: any; } = {};
        let propChangedIndexes: number[] = [];

        if (Array.isArray(prop)) {
            // Check if all properties are not equal to the business props
            for (let i = 0; i < prop.length; i++) {
                const param = prop[i];
                if (!areObjectsEqual(businessFormFields.value[param].value, business.value[param]))
                    propChangedIndexes.push(i);
            }

            for (let i = 0; i < propChangedIndexes.length; i++) {
                const propChangedIndex = propChangedIndexes[i];

                editObj[prop[propChangedIndex]] = businessFormFields.value[prop[propChangedIndex]].value;
                businessFormFields.value[prop[propChangedIndex]].state = 'loading';
            }

            if (propChangedIndexes.length === 0)
                return toggleDialog(dialogElement);
        } else {
            if (areObjectsEqual(businessFormFields.value[prop].value, business.value[prop]))
                return toggleDialog(dialogElement);

            businessFormFields.value[prop].state = 'loading';

            editObj[prop] = businessFormFields.value[prop].value;
        }

        const { response, data } = await updateBusiness(business.value._id, editObj);

        if (response.value!.ok && data.value) {
            business.value = data.value;

            if (Array.isArray(prop)) {
                for (let i = 0; i < propChangedIndexes.length; i++) {
                    const param = prop[propChangedIndexes[i]];
                    businessFormFields.value[param].state = 'success';
                }

                setTimeout(() => {
                    for (let i = 0; i < propChangedIndexes.length; i++) {
                        const param = prop[propChangedIndexes[i]];
                        if (businessFormFields.value[param].state === 'edit' || businessFormFields.value[param].state === 'loading' || businessFormFields.value[param].state === 'success') 
                            businessFormFields.value[param].state = 'idle';
                    }

                    if (!isDialogClosed(dialogElement))
                        toggleDialog(dialogElement);
                }, 2000);
            } else {
                businessFormFields.value[prop].state = 'success';

                setTimeout(() => {
                    businessFormFields.value[prop].state = 'idle';

                    if (!isDialogClosed(dialogElement))
                        toggleDialog(dialogElement);
                }, 2000);
            }

            useTost('Business Information updated successfully!', 2000);
        }
    } catch (error) {
        console.error(error);
    } finally {
        loader.finishLoader();
    }
}

</script>

<style>
.on-place-enter-active,
.on-place-leave-active {
  transition: opacity 0.35s ease;
  position: absolute;
}

.on-place-enter-from,
.on-place-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.options-section {
    @apply min-w-[27rem] flex flex-col gap-3
    ;
}

/* .setup-address {
   @apply w-full
   ;
} */

.business-categories-input svg {
	@apply  cursor-pointer stroke-2 text-gray-600 hover:text-black
	;
}

.business-categories-input ul {
	@apply 	h-fit p-2 flex flex-wrap gap-2 border-2 border-[#1b1b1b] bg-transparent transition-[border]
			focus:outline-none focus:border-b-rose-600 
	;
}

#businessCategories {
	@apply disabled:bg-transparent
	;
	width: 100% !important;
}

.business-categories-input .business-categories-result {
	@apply	max-h-64 flex flex-col flex-nowrap gap-0 bg-white shadow-lg absolute transition-all duration-300
            top-[calc(100%-3rem)] -left-[0.15rem] opacity-0 pointer-events-none 
            overflow-hidden overflow-y-scroll z-[500]
	;
}

.business-categories-input > input:focus + .show-business-categories-input {
    @apply  opacity-100 pointer-events-auto top-[calc(100%+0.75rem)] 
	;
}

.business-categories-input .show-business-categories-input {
    @apply  hover:top-[calc(100%+0.75rem)] hover:opacity-100 hover:pointer-events-auto
	;
}

.business-categories-input ul li input:focus + .show-business-categories-input {
	@apply top-[calc(100%+0.75rem)] opacity-100 pointer-events-auto
	;
}
.business-categories-input ul li input:disabled + .show-business-categories-input {
	@apply top-[calc(100%-3rem)] opacity-0 pointer-events-none 
	;
}

.business-categories-result li {
	@apply 	p-2 cursor-pointer border-b-2  
			hover:border-b-rose-700
			transition-all duration-300
	;
}

/* DEBOUNCE */
.debounce-search-input ul {
	@apply 	h-fit flex gap-2 border-2 border-[#1b1b1b] transition-[border]
			focus:outline-none focus:border-b-rose-600 
	;
}

.search-result {
	@apply	w-52 max-h-80 flex flex-col flex-nowrap gap-0 bg-white shadow-lg absolute transition-all duration-300
            top-[calc(100%-3rem)] left-0 opacity-0 pointer-events-none 
            overflow-hidden overflow-y-scroll z-[500]
	;
}

.debounce-search-input .search-result {
	@apply 	p-2 cursor-pointer border-b-2  
			transition-all duration-300
	;
}

.search-result li {
	@apply 	p-2 cursor-pointer border-b-2  
			hover:border-b-rose-700
			transition-all duration-300
	;
}

.show-search-results:hover {
	@apply opacity-100 pointer-events-auto top-[calc(100%+0.75rem)]
	/* @apply  opacity-100 pointer-events-auto top-[calc(100%+0.75rem)]
	;  */
}

.debounce-search-input > input:focus + .show-search-results {
    @apply  opacity-100 pointer-events-auto top-[calc(100%+0.75rem)] 
	;
}
</style>