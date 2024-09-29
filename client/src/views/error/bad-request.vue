<template>
	<div class="m-auto flex flex-col gap-10 justify-center items-center relative text-[#1b1b1b]">
		<h1 id="errorTitle" class="text-4xl text-[#1b1b1b] font-bold">Bad Request</h1>
		<LucideIcon id="errorIcon" class="text-[#1b1b1b]" name="TriangleAlert" :size="128" :stroke-width="1.5" />
		<p id="errorBody">Please </p>
	</div>
</template>

<script lang="ts" setup>
import { definePage } from 'unplugin-vue-router/runtime';

import LucideIcon from '@/components/ui/LucideIcon.vue';

definePage({
    meta: {
        title: 'Bad Request',
        auth: 'both',
    },
    name: 'bad-request',
});
</script>

<style scoped>
#errorTitle {
	@apply opacity-0
	;
	animation: fade-up 0.5s ease forwards;
}

#errorIcon {
	@apply opacity-0
	;
	animation: fade-up 0.5s 0.5s ease forwards;
}

#errorBody {
	@apply opacity-0
	;
	animation: fade-up 0.5s 1s ease forwards;
}

@keyframes fade-up {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>