<template>
	<div class="main-preview">
		<header>
			<h1 class="text-lg font-bold">Virtual<span class="text-rose-600">Waiter</span></h1>
			<span class="w-[1px] bg-[#1b1b1b] mx-3"></span>
			<ul class="nav-links flex gap-2">
				<li><span class="nav-link"></span></li>
				<li><span class="nav-link"></span></li>
				<li><span class="nav-link"></span></li>
			</ul>

			<div class="absolute-center w-32 h-8 flex bg-gray-200 border-2 border-gray-100 cursor-pointer">
				<div class="w-7 h-full border-r-2 border-gray-100"></div>
				<div class="w-7 ml-auto h-full border-l-2 border-gray-100"></div>
			</div>

			<div class="ml-auto relative flex">
				<ul class="nav-links flex gap-2">
					<li><span class="nav-link"></span></li>
					<li><span class="nav-link"></span></li>
					<li><span class="nav-link"></span></li>
				</ul>
			</div>
		</header>

		<div class="business-preview">
			<div class="flex justify-between gap-20 text-sm">
				<div class="w-full flex flex-col gap-5">
					<div class="h-fit w-full flex flex-col gap-2">
						<h1 class="h-7 font-bold text-xl">{{ name }}</h1>
						<Review class="text-gray-200 fill-gray-200" :stars="5" :reviews="10" :sizes="18" />

						<span class="px-24 py-2 w-fit bg-gray-200"></span>

						<div class="flex gap-5 text-black">
							<div class="flex gap-1 items-center">
								<LucideIcon class="w-fit h-auto p-[1px] border-2 bg-gray-200 rounded-md" name="Star" :size="16" :stroke-width="2" />
								<p>Write a review</p>
							</div>
							<div class="flex gap-1 items-center">
								<LucideIcon class="w-fit h-auto p-[1px] border-2 bg-gray-200 rounded-md" name="Camera" :size="16" :stroke-width="2" />
								<p>Add Photo</p>
							</div>
							<div class="flex gap-1 items-center">
								<LucideIcon class="w-fit h-auto p-[1px] border-2 bg-gray-200 rounded-md" name="Share2" :size="16" :stroke-width="2" />
								<p>Share</p>
							</div>
							<div class="flex gap-1 items-center">
								<LucideIcon class="w-fit h-auto p-[1px] border-2 bg-gray-200 rounded-md" name="Bookmark" :size="16" :stroke-width="2" />
								<p>Save</p>
							</div>
						</div>
					</div>

					<div class="border-b border-b-gray-200"></div>

					<div class="flex gap-20">
						<div class="flex flex-col gap-3">
							<div class="w-fit px-16 py-3 bg-gray-200"></div>
							<div class="w-fit px-10 py-2 bg-gray-200"></div>
							<div class="w-fit px-14 py-2 bg-gray-200"></div>
							<div class="w-fit px-8 py-2 bg-gray-200"></div>
						</div>
						<div class="flex flex-col gap-5">
							<div class="w-fit px-16 py-4"></div>
							<div class="w-fit px-14 py-2 bg-gray-200"></div>
							<div class="w-fit px-16 py-2 bg-gray-200"></div>
						</div>
					</div>
					
					<div class="border-b border-b-gray-200"></div>

					<div class="flex flex-col gap-5">
						<div class="w-fit px-20 py-2 bg-gray-200"></div>
						<div class="flex gap-2">
							<div v-for="item in 3" :key="item" class="w-fit flex flex-col gap-1">
								<div class="px-16 py-12 bg-gray-200"></div>
								<div class="w-fit px-14 py-2 bg-gray-200"></div>
								<div class="flex gap-1">
									<div class="w-fit p-2 bg-gray-200"></div>
									<div class="w-fit p-2 bg-gray-200"></div>
									<div class="w-fit p-2 bg-gray-200"></div>
									<div class="w-fit p-2 bg-gray-200"></div>
									<div class="w-fit p-2 bg-gray-200"></div>
								</div>
							</div>
						</div>
					</div>

					<div class="border-b border-b-gray-200"></div>
					
					<div class="flex flex-col gap-3">
						<!-- <div class="w-fit px-16 py-2 bg-gray-200"></div> -->
						<h2 class="w-fit font-base font-bold">About the Business</h2>
						<div class="flex gap-7">
							<div class="w-fit px-24 py-12 bg-gray-200"></div>

							<div class="w-fit flex flex-col gap-2">
								<template v-if="hours">

								</template>
								<template v-else>
									<div v-for="item in 7" :key="item" class="flex gap-3">
										<div class="w-fit h-fit px-4 py-2 bg-gray-200"></div>
										<div class="w-fit h-fit px-14 py-2 bg-gray-200"></div>
									</div>
								</template>
							</div>
						</div>

					</div>
				</div>
				<div class="flex flex-col gap-5">
					<div class="flex flex-col text-nowrap">
						<div class="contact-pill">
							<template v-if="website && website.length > 0">
								<a :href="`https://${website}`" target="_blank" rel="noopener noreferrer">{{ website }}</a>
								<LucideIcon name="SquareArrowUpRight" :size="16" :stroke-width="2" />
							</template>
							<template v-else>
								<div class="px-24 py-[0.625rem] bg-gray-200"></div>
								<div class="px-2 py-[0.625rem] bg-gray-200"></div>
							</template>
						</div>
						<div class="contact-pill">
							<template v-if="phone && phone.length > 0">
								<a :href="`tel:+${phone}`">{{ phone }}</a>
								<LucideIcon name="PhoneOutgoing" :size="16" :stroke-width="2" />
							</template>
							<template v-else>
								<div class="px-24 py-[0.625rem] bg-gray-200"></div>
								<div class="px-2 py-[0.625rem] bg-gray-200"></div>
							</template>
						</div>
						<div class="contact-pill">
							<template v-if="location && location.length > 0">
								<div class="flex flex-col">
									<h3 class="font-bold hover:underline cursor-pointer">Get directions</h3>
									<p class="text-xs">{{ location }}</p>
								</div>
								<LucideIcon name="Map" :size="16" :stroke-width="2" />
							</template>
							<template v-else>
								<div class="flex flex-col gap-1">
									<div class="px-24 py-3 bg-gray-200"></div>
									<div class="px-24 py-[0.25rem] bg-gray-200"></div>
								</div>
								<div class="px-2 py-[0.625rem] bg-gray-200"></div>
							</template>
						</div>
						<div class="contact-pill">
							<div class="px-24 py-[0.625rem] bg-gray-200"></div>
							<div class="px-2 py-[0.625rem] bg-gray-200"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { CreateBusinessModel } from '@/types/business';

withDefaults(defineProps<CreateBusinessModel>(), {
	userId: '123',
	name: 'My Business',
	email: 'test@mybusiness.com',
	userEmail: 'test@myUserEmail.com',
	phone: '',
	is24: false,
	hours() {
		return {
			monday: '',
			tuesday: '',
			wednesday: '',
			thursday: '',
			friday: '',
			saturday: '',
			sunday: ''
		}
	},
	city: 'New York',
	streetAddresses() {  },
	description: 'A virtual waiter for your restaurant',
});


</script>

<style scoped>
.main-preview {
	@apply w-full pb-10 flex flex-col gap-5 border-4 border-black relative overflow-hidden z-50
}

header {
    @apply  w-full px-16 py-[calc(1.5625rem/2)] flex text-base border-b border-b-[#1b1b1b] bg-[#f8f8f8]
			relative
            
    ;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.nav-link {
	@apply  px-5 text-black transition-all bg-gray-200
			hover:cursor-pointer
}

.nav-links li {
    @apply relative;
}

.nav-link::before {
    @apply bg-rose-600 
    ;
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform .25s ease;
    transition-property: transform, height;
}

.nav-link:hover::before {
    transform-origin: left;
    transform: scaleX(1);
}

.nav-links .router-link-active:hover::before {
    transform-origin: left;
    height: 2.5px;
}

.nav-links:nth-child(3) li:first-child ::before {
    transform-origin: left;
    transform: scaleX(1) translate(0, 0px);
    height: 2.5px;
}

 
.nav-links:last-child .nav-link {
	@apply px-3 py-1
}

.nav-links:last-child li:first-child .nav-link {
	@apply bg-rose-600 
	;
}

.business-preview {
	@apply px-16 flex flex-col gap-10
}

.contact-pill {
	@apply p-3 flex gap-10 justify-between border-x border-b border-gray-200 text-sm items-center
}

.contact-pill:first-child {
	@apply border-t border-gray-200 
}

</style>