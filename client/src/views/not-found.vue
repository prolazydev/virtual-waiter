<template>
	<div class="mt-20 flex flex-col gap-10 justify-center items-center relative text-[#1b1b1b]">
		<h1 id="errorTitle" class="text-4xl text-[#1b1b1b] font-bold">Not Found</h1>


		<div id="errorIcon" class="relative">
			<LucideIcon 
				:class="{ 'opacity-0': isLeftSide, 'rotate-12': randomLucideImage === 'ChefHat' }" 
				class="text-[#1b1b1b] absolute top-0 left-0" 
				id="" 
				:name="randomLucideImage" 
				:size="128" 
			/>
			<LucideIcon 
				:class="{ 'opacity-0': !isLeftSide, '-rotate-12': randomLucideImage === 'ChefHat' }" 
				class="text-[#1b1b1b] -scale-x-100" 
				:name="randomLucideImage" 
				:size="128" 
			/>
		</div>
		
		<p class="title-explanation">We couldn't find that page :/</p>
		
		<div class="links relative flex flex-col items-center gap-1">
			<router-link to="/" class="px-2 py-1 border-b-2 border-b-transparent hover:border-b-[#1b1b1b] transition-colors" >
				Go Home
			</router-link>

			<span class="pb-2">or</span>

			<router-link to="/" id="searchLink" class="relative px-2 py-1 border-2 border-[#1b1b1b] overflow-hidden" >
				<p class="transition-all duration-300">Discover food</p>
				<LucideIcon name="ArrowRight" :size="16" :stroke-width="1.5" />
			</router-link>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useMouse } from '@vueuse/core'
import { definePage } from 'unplugin-vue-router/runtime';

import type { IconKeys } from "@/types";

definePage({
    meta: {
        title: 'Not Found'
    },
    name: 'not-found',
	path: '/:slug(.*)',
});

const route = useRoute('not-found');

// Todo: move to a constants folder 
const notFoundRandomLucideImages: IconKeys[] = [
	'Turtle',
	'ChefHat',
	'Cherry',
	'Apple',
	'Cable',
	'Antenna',
	'MonitorX'
] 
const randomLucideImage = getRandomLucideImage();

const x = useMouse().x;
let isLeftSide = computed(() => {
	return x.value < window.innerWidth / 2;
});

onMounted(() => {
	// @ts-expect-error typing
	document.title = `Not Found - ${route.params.slug}`
});

onUnmounted(() => {
});

function getRandomLucideImage(): IconKeys {
	const randomIndex = Math.floor(Math.random() * notFoundRandomLucideImages.length);
	return notFoundRandomLucideImages[randomIndex];
}
</script>

<style scoped>
#errorTitle, #errorIcon {
	@apply opacity-0
	;
	animation: fade-up 0.5s ease forwards;
	animation-iteration-count: 1;
}

#errorIcon {
	@apply opacity-0
	;
	animation: fade-up 0.5s 0.25s ease forwards;
}

.title-explanation {
	@apply text-2xl font-semibold opacity-0
	;
	animation: fade-up 0.5s 0.75s ease forwards;

}

.links > a, .links > span {
	@apply opacity-0
	;
	animation: fade-up 0.5s 1s ease forwards;

}

/* .links > a, .links > span {
	@apply opacity-0
	;
	animation: fade-up 0.5s 0.5s ease forwards;
} */

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

#searchLink svg {
	@apply absolute top-1/2 right-1/2 translate-x-[50%] translate-y-5 transition-all duration-300
	;
}

#searchLink:hover > svg {
	transform: translate(50%, -50%);
}

#searchLink:hover > p {
	@apply translate-y-10
}

</style>