<template>
	<div id="forgorForm">
		<form @submit.prevent="handleForgotPassword">
			<div class="flex flex-col mx-auto">
                <h1 class="w-fit text-3xl font-bold text-[#1b1b1b] uppercase tracking-widest">Forgor</h1>
                <div class="h-1 w-4 mb-5 bg-[#1b1b1b]"></div>
            </div>

			<div class="flex flex-col gap-2">
				<label for="emailInput">Email</label>
				<input v-model="email" type="email" name="email" id="emailInput" required autofocus autocomplete="off" />
			</div>

			<button class="forgor-button" :class="{ 'processing': requestStatus === 'Loading' }" type="submit">
                <p :class="{ 'translate-y-[calc(0%+40px)]': requestStatus === 'Success' || requestStatus === 'Error' }" class="transition-transform duration-500 delay-100">Login</p>
                <LucideIcon :class="{ 'mt-14': requestStatus === 'Success', '-mt-14': requestStatus === 'Idle' || requestStatus === 'Error' }" id="loaderIcon" class="absolute"  name="Loader" :size="32" :stroke-width="2" />
                <LucideIcon :class="{ 'show-loading-result': requestStatus === 'Success' }" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-16 transition-all duration-500" id="chefHatIcon" name="ChefHat"  :size="32" :stroke-width="2"  />
                <LucideIcon :class="{ 'show-loading-result': requestStatus === 'Error' }" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-16 transition-all duration-500" id="chefHatIcon" name="CircleX"  :size="32" :stroke-width="2"  />
            </button>
		</form>
	</div>
</template>

<script lang="ts" setup>
import type { RequestStatus } from '@/enums/EFromValidations';

const router = useRouter();

const email = ref('');
const requestStatus = ref<RequestStatus>('Idle');

const handleForgotPassword = async () => {
	requestStatus.value = 'Loading';

	try {
		const { response, error } = await myFetch('auth/forgot_password_request', { email: email.value }, { method: 'POST' });

		if (response.value?.ok || error.value != null) {
            requestStatus.value = 'Success';

            setTimeout(async () => {
                await tostRouterTo(router, '/', {}, 'Password reset link sent to your email');
            }, 650);
        } else {
            requestStatus.value = 'Error';
            setTimeout(() => requestStatus.value = 'Idle', 1250)
            console.log(error.value);
        }
		
	} catch (error) {
		requestStatus.value = 'Error';
		
	}
}
</script>

<style scoped>
#forgorForm {
	@apply m-auto my-12 py-16 px-20 flex gap-20 bg-white border-4 border-[#1b1b1b];

}

#forgorForm form {
	@apply w-full flex flex-col gap-5;
}

#forgorForm input {
    @apply  w-64 p-2 border-2 border-[#1b1b1b] transition-colors
            focus:outline-none focus:border-b-rose-600
    ;
}

.forgor-button {
	@apply  p-2 bg-[#1b1b1b] text-white uppercase tracking-widest font-semibold border-4 border-[#1b1b1b]
            relative overflow-hidden transition-all
            focus:outline-none
            focus-visible:border-b-rose-600
            active:border-b-white
    ;
}

#loaderIcon {
    @apply  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700
}

.processing #loaderIcon {
    @apply mt-0
    ;
    animation: loading 1s ease 0s infinite forwards;
}
.processing p {
	@apply translate-y-[calc(0%+40px)]
}

.show-loading-result  {
    @apply -translate-y-1/2
}

.show-label {
    @apply  opacity-100 left-0
    ;
}

.go-down {
    @apply top-11
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
</style>