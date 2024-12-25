<template>
	<div class="flex relative overflow-hidden transition-all" :class="{ 'processing': state === 'loading' }">
		<div 
			:class="{ 'translate-y-[calc(0%+40px)]': state === 'success' || state === 'error' }" 
			class="transition-transform duration-300 delay-100">
				<slot></slot>
		</div>

		<LucideIcon 
			class="absolute" 
			:class="{ 'mt-10': state === 'success' || state === 'idle', '-mt-14': state === 'idle' || state === 'error' }" 
			id="loaderIcon" 
			name="Loader" 
			size="22" 
			stroke-width="2" 
		/>
		<LucideIcon
			class="stroke-[#07B889] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-16 transition-all duration-500" 
			:class="{ 'process-success': state === 'success' }" 
			id="chefHatIcon" 
			name="CircleCheck"  
			size="22" 
			stroke-width="2"  
		/>
		<LucideIcon
			class="stroke-rose-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-16 transition-all duration-500" 
			:class="{ 'process-success': state === 'error' }" 
			id="chefHatIcon" 
			name="CircleX" 
			size="22" 
			stroke-width="2"  
		/>
	</div>
</template>

<script lang="ts" setup>
import type { LoadingState } from '@/types';

defineSlots<{
    default: void;
}>();

withDefaults(defineProps<{
	state?: LoadingState | 'preview';
}>(), {
	state: 'idle'
});
</script>

<style>
.processing > div {
    @apply translate-y-[calc(0%+40px)]
}

.process-success  {
    @apply -translate-y-1/2
}

#loaderIcon {
    @apply  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300
}

.processing #loaderIcon {
    @apply mt-0 absolute
    ;
    animation: loading 1s ease 0s infinite forwards;
}

@keyframes loading {
    0% {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(90deg);
    }
}

.process-success  {
    @apply -translate-y-1/2
}
</style>