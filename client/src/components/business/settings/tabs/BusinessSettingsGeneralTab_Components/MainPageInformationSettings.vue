<template>
    <MyDialog _class="page-information-settings-dialog p-7" class="w-full" title="Page Information Settings" size="full">
        <div class="w-full form-button-2" role="button" type="button">
            <div @click="customToggleDialog" class="px-2 flex justify-between items-center cursor-pointer">
                <div class="flex flex-col text-start">
                    <h3>General Business Page</h3>
                    <p>Access your Page's information</p>
                </div>
                <LucideIcon name="PencilLine" :stroke-width="2" />
            </div>
        </div>
        <template #body>
            <Suspense v-if="toggleBusinessInformationComponent" :timeout="0">
                <template #default>
                    <component :is="PageSettings"/>
                </template>
                <template #fallback>
                    <Loading class="absolute-center" />
                </template>
            </Suspense>
        </template>

        <template #footer>
            <div class="w-full flex flex-col gap-5">
                <hr class="border-[#1b1b1b]">

                <div class="w-full flex justify-end relative">
                    <button @click="customToggleDialog" class="form-button-1">
                        Close
                    </button>
                </div>
            </div>
        </template>
    </MyDialog>    
</template>

<script lang="ts" setup>
defineEmits<{
    updatedPageInformation: [];
}>();

const { toggleDialog } = myDialog();
const loader = useLoader();

const toggleBusinessInformationComponent = ref(false);

const customToggleDialog = () => {
    toggleDialog('.page-information-settings-dialog');
    toggleBusinessInformationComponent.value = true;
}   

const PageSettings = computed(() => {
    try {
		loader.startLoader();
        if (toggleBusinessInformationComponent.value) 
            return defineAsyncComponent(() => import('@/components/business/settings/tabs/BusinessSettingsGeneralTab_Components/PageInformationSettings_Components/PageInformationSettingsForm.vue'));

        else null;
    } catch (error) {
        console.error(error);   
        loader.finishLoader();
    } 
})
</script>

<style>

</style>
