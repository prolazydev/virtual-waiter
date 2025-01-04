<template>
	<button 
		:class="`base-button ${computedStyleType}`" 
		:type="type" 
		:disabled="disabled" 
	>
		<slot name="leading">

		</slot>
		<slot>

		</slot>

		<slot name="trailing">

		</slot>
	</button>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    type?: 'submit' | 'button';
	styleType?: 'full' | 'hollow' | 'link' | 'clean';
    disabled?: boolean;
}>(), {
	type: 'button',
	styleType: 'full',
	disabled: false,
});

defineSlots<{
	default: void;
	/**
	 * An element to display before the title.
	 * Typically an Icon or a CircleAvatar element.
	 */
	leading: void;
	/**
	 * An element to display after the title. 
	 * Typically an Icon element.
	 */
	trailing: void;
}>();

const computedStyleType = computed(() => {
	// debugger;
	switch (props.styleType) {
		case 'full':
			return 'button-main';
		case 'hollow':
			return 'button-main-hollow';
		case 'link':
			return 'button-main-link';
		case 'clean':
			return 'button-main-clean';
		default:
			return 'button-main';
	}
});
</script>


<style>
.button-main {
	@apply 	h-fit px-3 py-2 border-2 border-transparent border-[#1b1b1b] outline-none transition-all
			hover:bg-gray-100
}

.button-main-hollow {
	@apply 	h-fit px-3 py-2 border-2 border-transparent border-b-[#1b1b1b] outline-none transition-all
}

.button-main-link {
	@apply 	px-1 py-2 text-lg flex gap-2 items-center border-b-2 border-transparent outline-none transition-all 
			hover:border-b-rose-600 
			active:border-b-rose-800
}

.button-main-clean {
	@apply 	h-fit outline-none transition-all
}

</style>
<style scoped>

</style>