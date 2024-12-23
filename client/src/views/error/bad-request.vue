<template>
	<div class="bad-request-main">
		<h1 id="errorTitle" class="text-4xl text-[#1b1b1b] font-bold">Bad Request</h1>
		<LucideIcon id="errorIcon" class="text-[#1b1b1b]" name="TriangleAlert" :size="128" :stroke-width="1.5" />
		
		<p id="errorBody">Please try again later!</p>

		<div class="links relative flex flex-col items-center gap-1">
			<router-link to="/" class="px-2 py-1 border-b-2 border-b-transparent transition-colors hover:border-b-[#1b1b1b] active:border-b-rose-600">
				Go Home
			</router-link>

			<span class="pb-2">or</span>

			<router-link to="/" id="searchLink" class="relative px-3 py-1 border-2 border-[#1b1b1b] overflow-hidden transition-colors active:border-b-rose-600">
				<p class="transition-all duration-300">Discover food</p>
				<LucideIcon name="ArrowRight" :size="16" :stroke-width="1.5" />
			</router-link>
		</div>
	</div>
</template>

<script lang="ts" setup>
import LucideIcon from '@/components/ui/LucideIcon.vue';
</script>

<style scoped>
.bad-request-main {
	@apply m-auto flex flex-col gap-10 justify-center items-center relative text-[#1b1b1b]
	;
	height: calc(100vh - 328px);
}

#errorTitle {
	@apply opacity-0
	;
	animation: fade-up 0.5s 0s ease forwards;
}

#errorIcon {
	@apply opacity-0
	;
	animation: fade-up 0.5s 0.25s ease forwards;
}

#errorBody {
	@apply text-2xl font-semibold opacity-0
	;
	animation: fade-up 0.5s 0.60s ease forwards;
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

.links > a, .links > span {
	@apply opacity-0
	;
	animation: fade-up 0.5s 0.85s ease forwards;

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