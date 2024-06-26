<template>
	<div class="w-full p-12 flex flex-col gap-16 items-center">
		<div class="flex flex-col gap-5 items-center">
			<h1 class="text-4xl font-semibold">{{ requestStatus }}</h1>
			<h2 class="text-2xl ">{{ statusMessage }}</h2>
		</div>
		<div class="relative w-1 h-32 mx-auto">
			<LucideIcon class="loader-icon stroke-[#1b1b1b]" :class="{ 'processing-request': requestStatus === 'Loading' }" name="Loader" :size="128" />
			<LucideIcon class="icon stroke-[#07B889]" :class="{ 'show-icon': requestStatus === 'Success' }" name="PartyPopper" :size="128" />
			<LucideIcon class="icon stroke-rose-600" :class="{ 'show-icon': requestStatus === 'Error' || requestStatus === 'Forbidden' || requestStatus === 'Unauthorized' }" name="HeartCrack" :size="128" />
			<LucideIcon class="icon stroke-rose-600" :class="{ 'show-icon': requestStatus === 'Expired' }" name="CalendarX" :size="128" />
		</div>

		<div v-if="isAuth() && requestStatus === 'Expired'" class="flex flex-col items-center gap-3 opacity-0 z-10 transition-all duration-500 delay-700" :class="{ 'show-error-message': requestStatus === 'Expired' || requestStatus === 'Error' }">
			<p class="text-lg">Please resend the confirmation email to verify your account</p>
			<router-link class="button-link" :class="{ 'show-button-link': requestStatus === 'Expired' }" to="/account/settings">Go to Account</router-link>
		</div>
		<div v-else class="flex flex-col items-center gap-3 opacity-0 z-10 transition-all duration-500 delay-700" :class="{ 'show-error-message': requestStatus === 'Unauthorized' }">
			<router-link class="button-link" :class="{ 'show-button-link': requestStatus === 'Expired' }" to="/login">Login</router-link>
		</div>
		<LucideIcon class="mt-16 stroke-[#1b1b1b]" name="Dot" :size="14" :stroke-width="14" />
	</div>
</template>

<script lang="ts" setup>
import type { RequestStatus } from '@/enums/EFromValidations';

const router = useRouter();
const { params } = useRoute('/auth/confirm-account/[token]');
// const test = useRoute('/auth/confirm-account/[token]');


const { isAuth } = useAuth();

const requestStatus = ref<RequestStatus>('Idle');

const statusMessage = computed(() => {
	switch (requestStatus.value) {
		case 'Loading':
			return 'Confirming Account';
		case 'Success':
			return 'Account Confirmed';
		case 'Error':
			return 'Error Confirming Account. Please try again later';
		case 'Expired':
			return 'Token Expired';
		case 'Forbidden':
			return 'This token has already been used or expired';
		case 'Unauthorized':
			return 'Login to verify your account';
		default:
			return '';
	}
});

onMounted( async() => {
	setTimeout(() => requestStatus.value = 'Loading', 0)

	try {
		const { data, error, statusCode, response } = await myFetch<boolean>(`auth/confirm_account/${params.token}`, '', { method: 'PATCH' })
		if (!error.value) {
			// if ( data.value?.message === 'success' ) {
			if ( response.value?.ok ) {
				if ( data.value ) {
					requestStatus.value = 'Success';
					setTimeout(async () => await tostRouterTo(router, '/', {}, 'Account verified!'), 1000)
				} else 
					requestStatus.value = 'Expired';
			} else 
				requestStatus.value = 'Error';
		} 
		else if ( statusCode.value === 403 ) 
			requestStatus.value = 'Forbidden';
		else if ( statusCode.value === 401 ) 
			requestStatus.value = 'Unauthorized';
	} catch (error) {
		console.error(error);
	}
});	

</script>

<style scoped>
.icon {
	@apply 	mt-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 
			transition-all duration-500 -z-10
}

.show-icon {
    animation: fade-in-from-bottom 1s ease 0s 1 normal forwards;
}
@keyframes fade-in-from-bottom {
    to {
		@apply mt-0 opacity-100;
    }
}

.loader-icon {
    @apply  absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-0 opacity-0 transition-all duration-500
			-z-10
}
.processing-request  {
    @apply opacity-100
    ;
    animation: processing-request-animation 1s ease infinite;
}
@keyframes processing-request-animation {
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

.button-link {
	@apply 	relative w-fit px-2 py-3 text-lg font-semibold cursor-pointer
			z-10
}
.button-link::before {
	@apply 	content-[''] w-full h-1 bg-[#1b1b1b] transition-all duration-300
			absolute top-1/2 right-1/2 translate-x-1/2 translate-y-5
}
.button-link:hover::before {
	@apply  bg-rose-600
}

.show-error-message {
	@apply opacity-100
}

</style>