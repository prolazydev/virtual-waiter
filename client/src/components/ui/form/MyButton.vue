<template>
	<button 
		:class="`base-button ${computedOverallProps}`" 
		:type="type" 
		:disabled="disabled"
	>
		<slot name="leading"></slot>
		
		<slot></slot>

		<slot name="trailing"></slot>
	</button>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';

const props = withDefaults(defineProps<{
    type?: ButtonHTMLAttributes['type'];
    // type?: 'submit' | 'button';
	styleType?: 'full' | 'hollow' | 'link' | 'clean';
	color?: 'primary' | 'inverted-primary'
	size?: 'xs' | 'sm' | 'md' | 'lg';
    disabled?: boolean;
}>(), {
	type: 'button',
	styleType: 'full',
	color: 'primary',
	size: 'md',
	disabled: false,
});

const slots = defineSlots<{
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

const computedOverallProps = computed(
	() => `${getSize()} ${getStyleType()} ${getColor()} `);

function getSize() {
	switch (props.size) {
		case 'xs':
			return 'button-xs';
		case 'sm':
			return 'button-sm';
		case 'md':
			return 'button-md';
		case 'lg':
			return 'button-lg';
		default:
			return 'button-md';
	}
}

function getStyleType() {
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
}

function getColor() {
	switch (props.color) {
		case 'primary':
			return 'button-primary-color';
		case 'inverted-primary':
			return 'button-primary-inverted';
		default:
			return 'button-primary-color';
	}
}
</script>


<style>

</style>