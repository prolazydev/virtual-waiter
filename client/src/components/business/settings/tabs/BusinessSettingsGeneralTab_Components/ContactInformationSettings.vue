<template>
    <div class="w-full flex flex-col">
        <MyDialog class="w-full" _class="contact-info-dialog w-[30rem] p-7" title="Contact Information Settings" size="custom">
            <div @click="toggleDialog('.contact-info-dialog')" class="form-button-2" role="button" type="button">
                <div class="px-2 flex justify-between items-center cursor-pointer">
                    <div class="flex flex-col text-start">
                        <h3>Contact Information</h3>
                        <!-- TODO: Maybe add a loading string indicator  -->
                        <p class="">{{ businessEdit.email }}, {{ businessEdit.userEmail }}, {{ businessEdit.phone }}</p>
                    </div>
                    <LucideIcon name="PencilLine" :stroke-width="2" />
                </div>
            </div>
            <template #body>
                <div class="w-full max-h-[25rem] overflow-auto mx-auto py-7 flex flex-col justify-between">
                    <div class="input-group">
                        <div class="w-full mt-5 flex items-center gap-5 relative">
                            <LucideIcon class="absolute left-2" name="Mail" size="22" />
                                
                            <span class="text-sm text-gray-600 absolute -top-5">Personal mail</span>
                            <input 
                                class="form-input-with-icon w-60 min-w-60 max-w-60"
                                :id="`contactDetail_1`" 
                                type="email" 
                                placeholder="im@just.ken"
                                :value="businessEdit.userEmail"
                                readonly
                            />

                            <button @click="goToUserSettings" class="form-button-2 w-full" type="button">
                                Change
                            </button>
                        </div>

                        <div v-for="(item, index) in contactListFields" :key="index" class="flex items-center gap-5 relative">
                            <LucideIcon v-if="item.type === 'email'" class="absolute left-2" name="Mail" size="22" />
                            <LucideIcon v-else class="absolute left-2" name="Phone" size="22" />

                            <input 
                                class="form-input-with-icon w-60 min-w-60 max-w-60" 
                                :id="`contactDetail_${index + 2}`" 
                                :type="(item.type === 'phone') ? 'number' : 'email'" 
                                :placeholder="(item.type === 'phone') ? '123456777' : 'im@just.ken'"
                                :value="contactListFields[index].value"
                                :readonly="contactListFields[index].state === 'edit'"
                                v-model="contactListFields[index].value"
                            />

                            <div class="w-full flex gap-5 justify-between">
                                <button @click="handleToggleEditOrCreate(index)" class="form-button-2 relative w-full" type="button">
                                    <CustomLoader :state="contactListFields[index].processingState" class="edit-button">
                                        {{ contactListFields[index].state === 'edit' ? 'Edit' : 'Save' }}
                                    </CustomLoader>
                                </button>
                                
                                <button @click="handleLocalDelete(index)" class="form-button-2" type="button">
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div class="flex justify-between items-center">
                            <button popovertarget="myPopupTest" id="btnPopOverToggleTest" class="flex gap-3 items-center" type="button">
                                <LucideIcon name="CirclePlus" />
                                Add new contact
                            </button>

                            <Popup class="mt-10 ml-0" id="myPopupTest" anchor-name="--testPopover">
                                <div class="flex flex-col gap-1">
                                    <button @click="handleLocalAdd('email')" popovertarget="myPopupTest" class="px-1 py-2 text-lg flex gap-2 items-center border-b-2 border-transparent transition-all hover:border-b-rose-600" type="button">
                                        <LucideIcon name="Mail" size="22" />
                                        Email
                                    </button>
                                    <button @click="handleLocalAdd('phone')" popovertarget="myPopupTest" class="px-1 py-2 text-lg flex gap-2 items-center border-b-2 border-transparent transition-all hover:border-b-rose-600" type="button">
                                        <LucideIcon name="Phone" size="22" />
                                        Phone
                                    </button>
                                </div>
                            </Popup>
                        </div>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="w-full flex flex-col gap-5">
                    <hr class="border-[#1b1b1b]">

                    <button @click="toggleDialog('.contact-info-dialog')" class="form-button-1 w-fit ml-auto">
                        Close
                    </button>
                </div>
            </template>
        </MyDialog>		

        <MyDialog _class="delete-contact-info-dialog w-[30rem] p-7" title="Delete contact" size='custom'>
            <template #body>
                <div class="w-full max-h-[25rem] overflow-auto mx-auto py-7 flex flex-col justify-between">
                    <h2 class="text-lg"> {{ deleteContactInfo.title }} </h2>
                </div>
            </template>

            <template #footer>
                <div class="w-full flex flex-col gap-5">
                    <hr class="border-[#1b1b1b]">

                    <div class="w-full flex justify-end relative">
                        <div class="flex gap-5 absolute-center">
                            <button @click="handleFinishDelete(deleteContactInfo.index)" class="form-button-2">
                                <CustomLoader :state="deleteContactInfoDialog.processingState" class="edit-button">
                                    Delete
                                </CustomLoader>
                            </button>
                        </div>
                        
                        <button @click="toggleDialog('.delete-contact-info-dialog')" class="form-button-1">
                            Close
                        </button>
                    </div>
                </div>
            </template>
        </MyDialog>
    </div>
</template>

<script lang="ts" setup>
import type { Business, BusinessEdit, EditContactField } from '@/types/models/business';

const router = useRouter();
const { params } = useRoute('business-dashboard-settings');

const { user } = useUserStore();

const { toggleDialog } = myDialog();
const { 
    addContactField,
    localDeleteContactField,
    toggleEditOrCreateContact,
    deleteContactField,
} = businessSettingsService();

const business = ref<Business>({} as Business);
const contactListFields = ref<EditContactField[]>([]);
const businessEdit = ref<Partial<BusinessEdit>>({});

const deleteContactInfo = ref<{ title: string, index: number }>({ title: '', index: -1 });
const deleteContactInfoDialog = ref<EditContactField>({} as EditContactField);

const handleDataMapping = (data: Business) => {
	business.value = data;

	const businessEditKeys = Object.keys(data);

	for (let i = 0; i < businessEditKeys.length; i++) {
		const key = businessEditKeys[i] as keyof BusinessEdit;

		if (business.value[key] !== undefined)
			businessEdit.value[key] = (business.value[key as keyof Business]) as any;
	}

	contactListFields.value = [];
	for (let i = 0; i < business.value.contacts.length; i++) {
		contactListFields.value.push({
			type: business.value.contacts[i].contactType,
			value: business.value.contacts[i].value,
			state: 'edit',
			processingState: 'idle',
		});
	}
}
const handleGetBusiness = async () => {
    try {
        const { getBusinessSelfById } = businessService();

        const { response, statusCode, data } = await getBusinessSelfById(params.id, [ 'contacts', 'email', 'userEmail', 'phone' ]);

		if (response.value!.ok && data.value) 
			handleDataMapping(data.value);

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
	}
};
await handleGetBusiness();

const goToUserSettings = async () => 
    await router.push({ name: '/user/[username]', params: { username: user.username }, query: { setting: 'primary-email' } });

const handleToggleEditOrCreate = async (index: number) => 
    await toggleEditOrCreateContact(business, businessEdit, contactListFields, index);

const handleLocalDelete = (index: number) =>
    localDeleteContactField(businessEdit, contactListFields, deleteContactInfo, index);

const handleFinishDelete = async (index: number) => 
    await deleteContactField(business, businessEdit, contactListFields, deleteContactInfoDialog, index);

const handleLocalAdd = (type: 'email' | 'phone') => 
    addContactField(businessEdit, contactListFields, type);
</script>

<style>
#btnPopOverToggleTest {
	anchor-name: --testPopover;
}
</style>