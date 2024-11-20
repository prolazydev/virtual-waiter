<template>
	<section class="w-full flex flex-col h-full">
		<div class="flex flex-col mx-auto">
			<h1 class="w-fit text-3xl font-bold text-[#1b1b1b] uppercase tracking-widest">
                {{ userSettingTab }} Settings for {{ businessDisplayName }}
            </h1>
			<div class="h-1 w-4 mb-5 bg-[#1b1b1b]"></div>
		</div>

        <!-- TODO: Implement the component, make it so it gives the data and emits the save method for the specific data to save -->
        <div class="setting">
            <div class="form-part">
                <ContactInformationSettings />
            </div>
        </div>

        <div class="setting">
            <div class="form-part">
                <MainPageInformationSettings />
            </div>
        </div>

	</section>
</template>

<script lang="ts" setup>
import type { BusinessSettingsTabTitles } from '@/types/models/business';

onMounted(() => {
	
})

const props = defineProps<{
    userSettingTab: BusinessSettingsTabTitles;
    businessDisplayName: string;
}>();
</script>

<style>
@import '@/assets/base_forms.css';

.edit-button {
	@apply w-full
	;
}

.edit-button > div:first-child {
	@apply mx-auto select-none
	;
}
</style>

<style scoped>
.setting-hidden {
    @apply hidden
}

.setting input[type="button"] {
	@apply 	cursor-pointer text-red-600
}

.setting textarea {
	@apply 	h-[13.75rem]
}

#profileImage:hover + div > label, #coverImage:hover + div > label {
	@apply border-b-rose-600
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

.business-category-tooltip {
	@apply 	w-full text-nowrap capitalize
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

#btnPopOverToggleTest {
	anchor-name: --testPopover;
}

/* DEBOUNCE */
.debounce-search-input ul {
	@apply 	h-fit p-2 flex flex-wrap gap-2 border-2 border-[#1b1b1b] bg-transparent transition-[border]
			focus:outline-none focus:border-b-rose-600 
	;
}

.search-result {
	@apply	max-h-64 flex flex-col flex-nowrap gap-0 bg-white shadow-lg absolute transition-all duration-300
            top-[calc(100%-3rem)] -left-[0.15rem] opacity-0 pointer-events-none 
            overflow-hidden overflow-y-scroll z-[500]
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

.show-search-results {
	@apply  opacity-100 pointer-events-auto top-[calc(100%+0.75rem)]
	; 
}

.debounce-search-input > input:focus + .show-business-categories-input {
    @apply  opacity-100 pointer-events-auto top-[calc(100%+0.75rem)] 
	;
}


/* TESTING */
/* .my-popover {
	
} */

</style>