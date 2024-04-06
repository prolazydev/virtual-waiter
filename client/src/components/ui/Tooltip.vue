<template>
	<div class="tooltip">
		<span class="tooltip-text">{{ text }}</span>
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	text: string;
}>()
</script>

<style scoped>
.tooltip {
	@apply relative cursor-pointer
	;
}

.tooltip:hover .tooltip-text {
	@apply opacity-100 pointer-events-none
	;
}

.tooltip-text {
	@apply 	w-80 z-10 p-2 text-white text-sm rounded-md bg-[#1b1b1b] opacity-0 pointer-events-none 
			absolute bottom-5 left-1/2 -translate-x-1/2 transition-all duration-300
	;
}
</style>