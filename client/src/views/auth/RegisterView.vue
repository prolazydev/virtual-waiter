<template>
    <div class="w-fit h-full mx-auto mt-auto py-20">
        <div class="register-form">
            <div class="w-32 flex items-center justify-center relative">
                <div class="relative">
                    <LucideIcon id="formLoaderIcon" class="loader-icon stroke-[#1b1b1b]" :class="{ 'processing-request': requestStatus === 'Loading' }" name="Loader" :size="128" />
                    <LucideIcon id="formPartyPopper" class="opacity-0 stroke-[#07B889]" :class="{ 'form-icon': requestStatus === 'Success' }" name="PartyPopper" :size="128" />
                    <LucideIcon id="formHeartCrack" class="opacity-0 stroke-rose-600" :class="{ 'form-icon': requestStatus === 'Error' }" name="HeartCrack" :size="128" />
                    <LucideIcon id="formChefHatIcon" class="center-hat stroke-[#1b1b1b]" :class="{ 'move-hat': registerForm.becomeChef && requestStatus === 'Idle' }" name="ChefHat" :size="128" />
                    <LucideIcon id="formUserIcon" class="stroke-[#1b1b1b]" :class="(requestStatus === 'Idle') ? 'user-icon form-icon' : 'opacity-0'"  name="UserRound" :size="128" />
                </div>
            </div>
            <div id="formDivider"></div>
            <div>
                <h1 class="text-3xl font-bold text-[#1b1b1b] uppercase tracking-widest">Sign Up</h1>
                <div class="h-1 w-4 mb-5 bg-[#1b1b1b]"></div>
                <form @submit.prevent="signUp" id="registerForm" class="flex flex-col gap-4">
                    <div class="relative flex flex-col gap-2">
                        <label for="username">Username</label>
                        <input v-model="registerForm.username" @keyup="validateUsername" type="text" id="username" autofocus />
                        <LucideIcon :class="{ 'show-icon': usernameValidity === 'Valid' }" class="absolute top-0 -right-10 opacity-0 pointer-events-none transition-all duration-500" :size="32" :stroke-width="2" name="Check" />
                        <LucideIcon :class="{ 'show-icon': usernameValidity === 'Invalid' }" class="absolute top-[100%] -right-10 opacity-0 pointer-events-none transition-all duration-500" :size="32" :stroke-width="2" name="X" />
                        <LucideIcon :class="{ 'show-icon': usernameValidity === 'Taken' }" class="absolute top-[100%] -right-10 opacity-0 pointer-events-none transition-all duration-500" :size="32" :stroke-width="2" name="UserRoundX" />
                    </div>
                    <div class="relative flex flex-col gap-2">
                        <label for="email">Email</label>
                        <input v-model="registerForm.email" type="email" id="email" />
                        <LucideIcon :class="{ 'show-icon': emailValidity === 'Valid' }" class="absolute top-0 -right-10 opacity-0 pointer-events-none transition-all duration-500" :size="32" :stroke-width="2" name="Check" />
                        <LucideIcon :class="{ 'show-icon': emailValidity === 'Invalid' }" class="absolute top-[100%] -right-10 opacity-0 pointer-events-none transition-all duration-500" :size="32" :stroke-width="2" name="X" />
                    </div>
                    <div class="relative flex flex-col gap-2">
                        <label for="password">Password</label>
                        <input v-model="registerForm.password"  type="password" id="password" />
                        <LucideIcon :class="{ 'show-icon': passwordValidity === 'Valid' }" class="absolute top-0 -right-10 opacity-0 pointer-events-none transition-all duration-500" :size="32" :stroke-width="2" name="Check" />
                        <LucideIcon :class="{ 'show-icon': passwordValidity === 'Invalid' }" class="absolute top-[100%] -right-10 opacity-0 pointer-events-none transition-all duration-500" :size="32" :stroke-width="2" name="X" />
                    </div>
                    <div class="relative flex flex-col gap-2">
                        <label for="confirmPassword">Confirm Password</label>
                        <input v-model="registerForm.confirmPassword" type="password" id="confirmPassword" />
                        <LucideIcon :class="{ 'show-icon': confirmPasswordValidity === 'Valid' }" class="absolute top-0 -right-10 opacity-0 pointer-events-none transition-all duration-500" :size="32" :stroke-width="2" name="Check" />
                        <LucideIcon :class="{ 'show-icon': confirmPasswordValidity === 'Invalid' }" class="absolute top-[100%] -right-10 opacity-0 pointer-events-none transition-all duration-500" :size="32" :stroke-width="2" name="X" />
                    </div>
                    <div class="flex gap-3">
                        <Checkbox v-model="registerForm.becomeChef" _label="Become a Chef" _id="becomeChefCheckbox" />
                    </div>
                    <button id="submitButton" class="w-full bg-[#1b1b1b] text-white py-2 ">
                        <p class="transition-transform duration-500">Sign Up</p>

                        <LucideIcon class="absolute" name="ChefHat" :size="32" :stroke-width="2"  />
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { InputValidity, RequestStatus } from '@/enums/EFromValidations';

const router = useRouter();

// const becomeChef = ref(false);
const registerForm = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    becomeChef: false
});
const usernameValidity = ref<InputValidity>('Empty');
const takenUsernames = ref(new Set<string>);
// TODO: Add cached emails
// const takenEmails = ref(new Set<string>);
const requestStatus = ref<RequestStatus>('Idle');

const usernameRegex = /^[a-zA-Z0-9._]{2,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

const validateUsername = async () => {
    if (registerForm.value.username.length === 0) 
        return usernameValidity.value = 'Empty';
    if (!usernameRegex.test(registerForm.value.username)) 
        return usernameValidity.value = 'Invalid';
    if (takenUsernames.value.has(registerForm.value.username))
        return usernameValidity.value = 'Taken';

    usernameValidity.value = 'Valid';
    await debounceSearch();
}

watch(takenUsernames.value, () => {
    if (takenUsernames.value.has(registerForm.value.username)) 
        usernameValidity.value = 'Taken';
    else 
        usernameValidity.value = 'Valid';
});


// TODO: Implement this
// watch(takenEmails.value, () => {
//     if (takenEmails.value.has(registerForm.value.email)) 
//         emailValidity.value = 'Taken';
//     else 
//         emailValidity.value = 'Valid';
// });

const emailValidity = computed(() => {
    if (registerForm.value.email.length === 0) 
        return 'Empty';

    if (!emailRegex.test(registerForm.value.email)) 
        return 'Invalid';
    else 
        return 'Valid';
})
const passwordValidity = computed(() => {
    if (registerForm.value.password.length === 0) 
        return 'Empty';

    if (!passwordRegex.test(registerForm.value.password)) 
        return 'Invalid';
    else 
        return 'Valid';
})
const confirmPasswordValidity = computed(() => {
    if (registerForm.value.confirmPassword.length === 0) 
        return 'Empty';

    if (registerForm.value.password !== registerForm.value.confirmPassword) 
        return 'Invalid';
    else 
        return 'Valid';
})
const isFormValid = computed(() => {
    return usernameValidity.value === 'Valid' && emailValidity.value === 'Valid' && passwordValidity.value === 'Valid' && confirmPasswordValidity.value === 'Valid';
})

const debounceSearch = useDebounceFn(async () => {
    if (usernameValidity.value) {
        const res = await myFetch<boolean>(`auth/user/${registerForm.value.username}`, );
        if (!res.data) 
            return takenUsernames.value.add(registerForm.value.username);
    }
}, 500)

const signUp = async () => {
    if (isFormValid.value) {
        requestStatus.value = 'Loading';
        try {
            const { data } = await myFetch<boolean>('auth/register', registerForm.value, { method: 'POST' })
            // const test = await useFetch('test', { method: 'POST' })
         
            if (data.value) {
                requestStatus.value = 'Success';
                setTimeout( async() => await tostRouterTo(router, '/', 'Please check your email to verify your account'), 1000)
            }
        } catch (error) {
            console.error(error);
        } 
    }
}


</script>

<style scoped>
/* Green color #07B889 */

.register-form {
    @apply relative mt-auto py-16 px-20 flex gap-20 border-4 border-[#1b1b1b]
}

.form-icon {
    @apply absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]
    ;

    animation: fade-in-from-bottom 1s ease 0s 1 normal forwards;
}

.user-icon {
    @apply  opacity-100
    ;
}
@keyframes fade-in-from-bottom {
    from {
        transform: translate(-50%, 0%);
        opacity: 0;
    }
    to {
        transform: translate(-50%, -50%);
        opacity: 1;
    }
}
#formUserIcon {
    @apply  absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] transition-all 
            duration-500 
}

.center-hat {
    @apply  absolute top-1/2 left-1/2 -translate-x-[100%] -translate-y-[150%] -rotate-45 opacity-0
            transition-all duration-500 fill-white z-10

    ;
}
.move-hat {
    @apply -translate-x-[60%] -translate-y-[115%] -rotate-12 opacity-100
}

.loader-icon {
    @apply mt-32 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] opacity-0 transition-all duration-500
}
.processing-request  {
    @apply mt-0 opacity-100
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

#registerForm input[type="text"], #registerForm input[type="email"], #registerForm input[type="password"] {
    @apply  p-2 border-2 border-[#1b1b1b] bg-transparent w-64 transition-[border]
            focus:outline-none focus:border-b-rose-600
            /* focus:outline-none focus:border-[#1b1b1b] focus:ring-2 focus:ring-rose-600  */
    ;
}

#formDivider {
    @apply relative
}
#formDivider::before {
    @apply absolute -left-1/2 block w-1 h-full bg-[#1b1b1b] content-[''];
}

#submitButton {
    @apply  border-4 border-[#1b1b1b] bg-[#1b1b1b] text-white uppercase tracking-widest font-semibold relative overflow-hidden
            transition-all duration-500
            focus:outline-none
            focus-visible:border-b-rose-600
            active:border-b-white focus:duration-300
}
#submitButton > svg {
    @apply top-1/2 left-1/2 translate-x-[-50%] translate-y-[calc(-50%+45px)] transition-all duration-500
}
#submitButton:hover svg {
    @apply translate-y-[-50%]
}
#submitButton:hover p {
    @apply translate-y-[calc(0%-40px)]
}

.show-icon {
    @apply top-1/2 opacity-100 pointer-events-auto
}

</style>