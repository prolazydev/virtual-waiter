<template>
    <nav>
        <h1 class="text-3xl font-bold">Virtual<span class="text-rose-600">Waiter</span></h1>
        <!-- <span class="w-[2px] bg-gray-700 mx-3"></span> -->
        <span class="w-[2px] bg-[#1b1b1b] mx-3"></span>
        <ul class="nav-links flex gap-5">
            <li><router-link class="nav-link" to="/">Home</router-link></li>
            <li><router-link class="nav-link" to="/search">Discover</router-link></li>
            <li><router-link class="nav-link" to="/about">About</router-link></li>
        </ul>
        <form v-if="$router.currentRoute.value.name !== 'searchDashboard'" @submit.prevent="handleSearch" class="absolute-center flex items-center border-2 border-[#1b1b1b]">
            <div class="relative pl-[0.375rem] pr-[0.5rem]">
                <button type="button" class="dropdown-btn " aria-haspopup="menu">
                    <LucideIcon id="searchTypeIcon" class="flex margin-auto stroke-[#1b1b1b]" :name="searchType" :size="24" :strokeWidth=2 />
                    <span class="arrow"></span>
                </button>
                <ul class="dropdown-content -left-2.value">
                    <li @click.prevent="searchProps.searchType = 'general'"><p>General</p></li>
                    <li @click.prevent="searchProps.searchType = 'restaurants'"><p>Restaurants</p></li>
                    <li @click.prevent="searchProps.searchType = 'foods'"><p>Foods</p></li>
                </ul>
            </div>
            <input v-model="searchProps.query" class="pl-3 py-2 border-x-2 border-[#1b1b1b] bg-transparent text-xl focus:outline-none outline-none transition-all" type="text" placeholder="Where are we dining?">
            <button class="relative px-4" type="submit">
                <!-- TODO: Finding animation -->
                <LucideIcon class="animate-ping opacity-0 -z-[1] pointer-events-none" name="Search" :strokeWidth="2" :size="20" />
                <LucideIcon class="absolute-center hover:stroke-[3px] hover:cursor-pointer transition-all" name="Search" :size="24" :strokeWidth="2"  />
            </button>
        </form>
        <ul class="nav-links ml-auto flex gap-5 items-center justify-center self-center">
            <li v-if="!isAuth()"><router-link to="/register">Sign up</router-link></li>
            <li v-if="!isAuth()"><router-link to="/login">Login</router-link></li>
            <li v-if="isAuth()" >
                <LucideIcon v-if="user.avatar" name="UserRound" />
                <div v-else class="" id="">
                    <button type="button" class="dropdown-btn" aria-haspopup="menu">
                        <LucideIcon  name="UserRound" :stroke-width="2" />
                    </button>
                    <ul class="dropdown-content px-2 py-3 right-0">
                        <li><router-link to="/profile">Profile</router-link></li>
                        <li><button @click="handleLogout">Logout</button></li>
                    </ul>
                </div>
            </li>
            <!-- <li><router-link to="/login">logout</router-link></li> -->
            <li class="flex">
                <button><LucideIcon class="shopping-bag stroke-[#000]" name="ShoppingBag" :strokeWidth="2"/></button>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
import { tostRouterTo } from '@/composables/myRouter';
import { useAuth } from '@/composables/useAuth';
import { useUserStore } from '@/stores/user';
import type { IconKeys } from '@/types';

const { user } = useUserStore();
const { isAuth, logout } = useAuth();
const router = useRouter();

const searchProps = ref({
    searchType: 'general',
    query: ''
});

onMounted(() => {  });

watch(() => searchProps.value.searchType, () => {
    setTimeout(() => {
        const searchTypeIcon = document.getElementById('searchTypeIcon')!;

        searchTypeIcon.style.animation = 'strokeOffset 0.7s ease 0s 1 normal forwards';
    }, 0);
})

const searchType = computed<IconKeys>(() => {
    if (searchProps.value.searchType === 'general') return  'Zap'
    else if (searchProps.value.searchType === 'restaurants') return 'ChefHat'
    else if (searchProps.value.searchType === 'foods')  return 'CookingPot'
        
    return 'Zap';
});

async function handleSearch() {
    await router.push( { name: 'searchDashboard', query: { 
            searchType: searchProps.value.searchType, 
            query: searchProps.value.query
        }
    })
}

async function handleLogout() {
    await logout();
    // await router.push('/');
    await tostRouterTo(router, '/', 'Logged out successfully');
}

</script>

<style>
@keyframes strokeOffset {
    to {
        stroke-dashoffset: 140;
    }
}
</style>

<style scoped>
nav {
    @apply  w-full mb-[87px] px-32 py-[1.5625rem] flex text-2xl border-b border-b-[#1b1b1b] bg-[#f8f8f8]
            fixed z-50 
    ;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.nav-links li {
    @apply relative;
}

.nav-link {
    @apply  px-3 py-4 text-black rounded-lg transition-all
            hover:cursor-pointer
}

.nav-link::before {
    @apply bg-rose-600 
    ;
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    /* background-color: #18272F; */
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform .25s ease;
    transition-property: transform, height;
}

.nav-links a:hover::before {
    transform-origin: left;
    transform: scaleX(1);
}

.nav-links .router-link-active:hover::before {
    transform-origin: left;
    height: 5px;
}

.nav-links .router-link-active::before {
    transform-origin: left;
    transform: scaleX(1) translate(0, 0px);
    height: 5px;
}

.dropdown-btn {
    @apply flex gap-1 items-center cursor-pointer
    ;
}
.dropdown-btn:focus + .dropdown-content {
    @apply border-black visible opacity-100;
} 
.dropdown-btn:focus > .arrow {
    transform: rotate(180deg);
}
.dropdown-btn:focus + .dropdown-content li {
    @apply opacity-100 pointer-events-auto;
}

.arrow {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #000;
    transition: transform ease-in-out 0.3s;
}

.dropdown-content {
    @apply  flex flex-col gap-1 w-fit text-start border-2 border-[#1b1b1b] bg-white opacity-0 transition-all 
            absolute top-12 shadow-lg
            pointer-events-none hover:pointer-events-auto hover:opacity-100 
            
}
.dropdown-content:hover > li {
    @apply opacity-100 pointer-events-auto;
}

.dropdown-content li {
    @apply  px-1 py-1 relative bg-white cursor-pointer opacity-0 transition-all z-10
            border-b-4 border-b-transparent 
            pointer-events-none
            hover:border-b-rose-600 
    ;
}

.shopping-bag, #searchTypeIcon {
    stroke-dasharray: 70;
    stroke-dashoffset: 0;
}

.shopping-bag:hover {
    stroke-dashoffset: 140;
    transition: stroke-dashoffset 0.7s ease;
}

</style>