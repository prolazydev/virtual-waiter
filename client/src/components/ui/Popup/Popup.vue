<template>
	<div popover class="my-popover">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>

// Implement the popover component
withDefaults(defineProps<{
	// open: boolean;
	// toggleClass?: string;
	_class?: string;
	anchorName: string;
	// positioning?: string;
	// title?: string,
	// size?: 'sm' | 'md' | 'lg' | 'full' | 'custom';
}>(), {
	// open: false,
	// toggleClass: '',
	_class: '',
	anchorName: '',
	// positioning: 'center',
	// title: 'Dialog',
	// size: 'lg'
})

</script>

<style>
.my-popover {
	@apply border-2 border-[#1b1b1b] shadow-lg
	;
	position-anchor: v-bind(anchorName);
	/* TODO: Replace inset-area with position-area */
	/* inset-area: center; */
	position-area: center;
	position-try-options: flip-block;
}
</style>