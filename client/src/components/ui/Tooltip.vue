<template>
	<div class="tooltip">
		<span v-if="show" :class="_class" class="tooltip-text">{{ text }}</span>
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
defineSlots<{
	default: void;
}>();

withDefaults(defineProps<{
	show?: boolean;
	text?: string;
	_class?: string;
	delay?: number;
}>(), {
	show: true,
	_class: '',
	delay: 0,
})
</script>

<style>
.tooltip {
	@apply relative cursor-pointer
	;
}

.tooltip:hover .tooltip-text {
	@apply opacity-100 pointer-events-none 
	;

	transition-delay: v-bind(delay + 'ms');
}

.tooltip-text {
	@apply 	p-2 text-white text-sm bg-[#1b1b1b] opacity-0 pointer-events-none 
			absolute bottom-5 left-1/2 -translate-x-1/2 transition-all duration-300
	;
}
</style>