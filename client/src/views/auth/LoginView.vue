<template>
    <div id="loginForm" class="">
        <form @submit.prevent="handleLogin">
            <div class="flex flex-col mx-auto">
                <h1 class="w-fit text-3xl font-bold text-[#1b1b1b] uppercase tracking-widest">Login</h1>
                <div class="h-1 w-4 mb-5 bg-[#1b1b1b]"></div>
            </div>

            <div class="relative flex flex-col gap-2">
                <label class="opacity-0 transition-all duration-700" :class="{ 'opacity-100': identifierType === 'empty' }" for="identifier">Email / Username</label>
                <label class="absolute top-0 left-14 opacity-0 transition-all duration-700" :class="{ 'show-label': identifierType === 'username' }" for="identifier">Username</label>
                <label class="absolute top-0 left-14 opacity-0 transition-all duration-700" :class="{ 'show-label': identifierType === 'email' }" for="identifier">Email</label>
                <input v-model="identifier" type="text" id="identifier" autofocus autocomplete="off" />
            </div>
            <div class="relative flex flex-col gap-2">
                <label for="password">Password</label>
                <input v-model="loginFormData.password" type="password" id="password" />
            </div>
            <div class="relative w-3 h-3 mx-auto">
                <div :class="{ 'go-down': requestStatus === 'Loading' }" class="w-3 h-3 mx-auto bg-[#1b1b1b]  absolute top-0 rounded-full transition-all duration-700"></div>
            </div>
            <button class="login-button" :class="{ 'processing': requestStatus === 'Loading' }" type="submit">
                <p :class="{ 'translate-y-[calc(0%+40px)]': requestStatus === 'Success' }" class="transition-transform duration-500 delay-100">Login</p>
                <LucideIcon :class="{ 'mt-14': requestStatus === 'Success', '-mt-14': requestStatus === 'Idle' }" id="loaderIcon" class="absolute"  name="Loader" :size="32" :stroke-width="2" />
                <LucideIcon :class="{ 'process-success': requestStatus === 'Success' }" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-16 transition-all duration-500" id="chefHatIcon" name="ChefHat"  :size="32" :stroke-width="2"  />
            </button>
        </form>        
    </div>
</template>

<script lang="ts" setup>
import { tostRouterTo } from '@/composables/myRouter';
import type { RequestStatus } from '@/enums/fromValidations';
import type { LoggedInUser, LoginModel } from '@/types/auth/user';
import { myFetch } from '@/utils/http';
import { useAuth } from '@/composables/useAuth'


const loginFormData = ref<LoginModel>({
    loginType: 'invalid',
    password: '',
});
const identifier = ref('');

const usernameRegex = /^[a-zA-Z0-9._]{2,30}$/;

const requestStatus = ref<RequestStatus>('Idle');

const router = useRouter();
const route = useRoute();


onMounted(() => {
    // TODO: check if user is already logged in
})

const { login } = useAuth();
const identifierType = computed(() => {
    if (identifier.value === '') {
        loginFormData.value.loginType = 'invalid';
        return 'empty';
    }

    if (identifier.value.includes('@')) {
        loginFormData.value.loginType = 'email';
        return 'email'
    }
    if (usernameRegex.test(identifier.value)) {
        loginFormData.value.loginType = 'username';
        return 'username'
    } 
})

const handleLogin = async () => {
    requestStatus.value = 'Loading';
    let url = '';

    if (identifierType.value === 'email' && loginFormData.value.loginType === 'email') {
        url = 'auth/login';
        loginFormData.value.email = identifier.value;
        console.log(identifier.value);
    }
    else if (identifierType.value === 'username' && loginFormData.value.loginType === 'username') {
        url = 'auth/login_with_username';
        loginFormData.value.username = identifier.value;
        console.log(identifier.value);
    }
    else // TODO: show error message
        return;

    const { data, error, statusCode } = await myFetch<LoggedInUser>(url, loginFormData.value, { method: 'POST' })

    if (!error.value && data.value) {
        requestStatus.value = 'Success';

        login(data.value)

        const redirect = route.query.redirect as string ?? '/';
        await tostRouterTo(router, redirect, 'Logged in!');
    } else {
        requestStatus.value = 'Error';
        console.log(statusCode.value, error.value);
    }
}

</script>

<style scoped>
#loginForm {
    @apply mx-auto my-20 py-16 px-20 flex gap-20 border-4 border-[#1b1b1b]
    ;
}

#loginForm form {
    @apply flex flex-col gap-4
    ;
}

#loginForm input {
    @apply  w-64 p-2 border-2 border-[#1b1b1b] bg-transparent transition-[border]
            focus:outline-none focus:border-b-rose-600
    ;
}

.login-button {
    @apply  p-2 bg-[#1b1b1b] text-white uppercase tracking-widest font-semibold border-4 border-[#1b1b1b]
            relative overflow-hidden transition-all
            focus:outline-none
            focus-visible:border-b-rose-600
            active:border-b-white
    ;
}

.show-label {
    @apply  opacity-100 left-0
    ;
}

.go-down {
    @apply top-11
}

/* .login-button:focus-visible::before {
    @apply  content-[''] w-full h-1 absolute bottom-0 left-0 bg-white duration-75 transition-all
    ;
}

.login-button:active::before {
    @apply -bottom-1
} */


.login-button #loaderIcon {
    @apply  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700
}

.processing #loaderIcon {
    @apply mt-0
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

.processing p {
    @apply translate-y-[calc(0%+40px)]
}

.process-success  {
    @apply -translate-y-1/2
}




</style>