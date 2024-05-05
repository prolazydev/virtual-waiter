<template>
	<div class="mt-auto flex flex-col gap-10 justify-center items-center relative text-[#1b1b1b]">
		<h1 id="errorTitle" class="text-4xl text-[#1b1b1b] font-bold">Not Found</h1>
		<LucideIcon id="errorIcon" class="text-[#1b1b1b]" name="Turtle" :size="128" />
		<p class="text-2xl font-semibold">We couldn't find that page :/</p>

		<div class="relative flex flex-col items-center gap-1">
			<router-link to="/" class="px-2 py-1 border-b-2 border-b-transparent hover:border-b-[#1b1b1b] transition-colors" >
				Go Home
			</router-link>

			<span class="pb-2">or</span>

			<router-link to="/search" id="searchLink" class="relative px-2 py-1 border-2 border-[#1b1b1b] overflow-hidden hover:border-b-[#1b1b1b] transition-colors" >
				Discover food
				<LucideIcon name="ArrowRight" :size="16" :stroke-width="1.5" />
			</router-link>
		</div>
	</div>
</template>


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
	@apply absolute top-1/2 right-1/2 translate-x-[50%] translate-y-5 transition-all
	;
}

#searchLink:hover > svg {
	transform: translate(50%, -50%);
}

</style>