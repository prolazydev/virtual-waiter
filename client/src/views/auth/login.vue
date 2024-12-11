<template>
    <div id="loginForm">
        <form @submit.prevent="handleLogin">
            <div class="flex flex-col mx-auto">
                <h1 class="w-fit text-3xl font-bold text-[#1b1b1b] uppercase tracking-widest">Login</h1>
                <div class="h-1 w-4 mb-5 bg-[#1b1b1b]"></div>
            </div>

            <div class="relative flex flex-col gap-2">
                <label class="opacity-0 transition-all duration-700" :class="{ 'opacity-100': identifierType === 'empty' }" for="identifier">Email / Username</label>
                <label class="absolute top-0 left-14 opacity-0 transition-all duration-700" :class="{ 'show-label': identifierType === 'username' }" for="identifier">Username</label>
                <label class="absolute top-0 left-14 opacity-0 transition-all duration-700" :class="{ 'show-label': identifierType === 'email' }" for="identifier">Email</label>
                <input v-model="identifier" type="text" id="identifier" required autofocus autocomplete="off" />
            </div>
			<div class="relative flex flex-col gap-2">
				<label for="password">Password</label>
				<input v-model="loginFormData.password" type="password" id="password" required />
			</div>

			<Checkbox v-model="loginFormData.rememberMe" _label="Remember me" _id="rememberMe" :required="false" />
			
			<router-link to="/auth/forgot-password" class="text-end underline underline-offset-2 decoration-dotted hover:underline-offset-4 transition-all">
				Forgot Password?
			</router-link>
            
            <div class="relative w-3 h-3 mx-auto">
                <div :class="{ 'go-down': requestStatus === 'Loading' || requestStatus === 'Error' }" class="w-3 h-3 mx-auto bg-[#1b1b1b]  absolute top-0 rounded-full transition-all duration-700"></div>
            </div>
            <button class="login-button" :class="{ 'processing': requestStatus === 'Loading' }" type="submit">
                <p :class="{ 'translate-y-[calc(0%+40px)]': requestStatus === 'Success' || requestStatus === 'Error' }" class="transition-transform duration-500 delay-100">Login</p>
                <LucideIcon :class="{ 'mt-14': requestStatus === 'Success', '-mt-14': requestStatus === 'Idle' || requestStatus === 'Error' }" id="loaderIcon" class="absolute"  name="Loader" :size="32" :stroke-width="2" />
                <LucideIcon :class="{ 'process-success': requestStatus === 'Success' }" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-16 transition-all duration-500" id="chefHatIcon" name="ChefHat"  :size="32" :stroke-width="2"  />
                <LucideIcon :class="{ 'process-success': requestStatus === 'Error' }" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-16 transition-all duration-500" id="chefHatIcon" name="CircleX"  :size="32" :stroke-width="2"  />
            </button>

			<p class="text-center">OR</p>

			<!-- TODO: Implement an UI IconButton to easily implement button hover with icon effect -->
			<div class="flex justify-between gap-3">
				<!-- TODO: Figure out the google logo svg(since it's not on the lucide pack) -->
				<button class="social-login-button login-button w-full" type="button">
					<p>Google</p>
					<LucideIcon class="absolute" name="SquareArrowUpRight" :size="24" :stroke-width="2" />
				</button>

				<button class="social-login-button login-button w-full" type="button">
					<p>Facebook</p>
					<LucideIcon class="absolute" name="SquareArrowUpRight" :size="24" :stroke-width="2" />
				</button>
			</div>
			
			<hr class="border-black">

			<p class="text-center">Not a member? 
				<router-link to="/auth/register" class="underline underline-offset-2 decoration-dotted hover:underline-offset-4 transition-all">
					Signup here!
				</router-link>
			</p>
        </form>        
    </div>
</template>

<script lang="ts" setup>
import { definePage } from 'unplugin-vue-router/runtime';
import type { RouteNamedMap } from 'vue-router/auto-routes';

import type { RequestStatus } from '@/enums/EFromValidations';
import type { LoggedInUser, LoginModel } from '@/types/auth/user';

definePage({
    meta: {
        title: 'Login',
        auth: false,
    },
    name: 'login',
    // NOTE: If user is already logged in, redirect to home, also needs to use useAuth since using isAuth directly will be hoisted outside the setup() function
    beforeEnter: ({}, {}, next) => 
        useAuth().isAuth()
            ? next({ name: '/' })
            : next()
});

const router = useRouter();
const route = useRoute('login');

const { login } = useAuth();

const loginFormData = ref<LoginModel>({
    loginType: 'invalid',
    password: '',
    rememberMe: false,
});
const identifier = ref('');
const requestStatus = ref<RequestStatus>('Idle');
const usernameRegex = /^[a-zA-Z0-9._]{2,30}$/;

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
// TODO: Handle validation on the visual side to the client, (highlight incorrect input on red, show error message)
const handleLogin = async () => {
    requestStatus.value = 'Loading';
    let url = '';

    if (identifierType.value === 'email' && loginFormData.value.loginType === 'email') {
        url = 'auth/login';
        loginFormData.value.email = identifier.value;
    }
    else if (identifierType.value === 'username' && loginFormData.value.loginType === 'username') {
        url = 'auth/login_with_username';
        loginFormData.value.username = identifier.value;
    }
    else // TODO: show error message
        return;

    try {
        const { data, error, statusCode } = await myFetch<LoggedInUser>(url, loginFormData.value, { method: 'POST' })

        if (!error.value && data.value) {
            requestStatus.value = 'Success';

            login(data.value);
			
            setTimeout(() => {
                const redirect = (route.query.redirect ?? '/') as keyof RouteNamedMap;
                tostRouterTo(router, redirect, {}, 'Logged in!')
            }, 650);
        } else {
            requestStatus.value = 'Error';
            setTimeout(() => requestStatus.value = 'Idle', 1250)
            console.log(statusCode.value, error.value);
        }
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
#loginForm {
    @apply m-auto my-12 py-16 px-20 flex gap-20 bg-white border-4 border-[#1b1b1b]
    ;
}

#loginForm form {
    @apply flex flex-col gap-4
    ;
}

#loginForm input {
    @apply  w-64 p-2 border-2 border-[#1b1b1b] transition-colors
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


.social-login-button > svg {
    @apply top-1/2 left-1/2 translate-x-[-50%] translate-y-[calc(-50%+45px)] transition-all duration-500
}
.social-login-button:hover svg {
    @apply translate-y-[-50%]
}

.social-login-button p {
	@apply transition-transform duration-500 
}
.social-login-button:hover p {
    @apply translate-y-[calc(0%-40px)]
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