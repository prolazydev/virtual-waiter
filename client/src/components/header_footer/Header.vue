<template>
    <header>
        <h1 class="text-3xl font-bold">Virtual<span class="text-rose-600">Waiter</span></h1>
        <span class="w-[2px] bg-[#1b1b1b] mx-3"></span>
        <ul class="nav-links flex gap-5 items-center">
            <li><router-link class="nav-link" to="/">Home</router-link></li>
            <li><router-link class="nav-link" to="/search">Discover</router-link></li>
            <li><router-link class="nav-link" to="/about">About</router-link></li>
        </ul>
        <form @submit.prevent="handleSearch" class="absolute-center flex items-center border-2 border-[#1b1b1b]">
            <div class="relative pl-2 pr-[0.625rem]">
                <button type="button" class="dropdown-btn " aria-haspopup="menu">
                    <LucideIcon id="searchTypeIcon" class="flex margin-auto stroke-[#1b1b1b]" :name="searchType" :size="24" :strokeWidth=2 />
                    <span class="arrow"></span>
                </button>
                <ul class="dropdown-content left-[-2px]">
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
        <ul class="nav-links nav-right ml-auto flex gap-5 items-center">
            <template v-if="!isAuth()">
                <li><router-link class="nav-link" to="/register">Sign up</router-link></li>
                <li><router-link class="nav-link" to="/login">Login</router-link></li>
            </template>
            <template v-else>
                <!-- TODO: my restaurant -->
                <li class="header-nav-icon">
                    <router-link to="/dashboard" title="My Businesses Dashboard"><LucideIcon class="nav-icon cursor-pointer transition-all" name="ChefHat" :strokeWidth="2" tooltip="test" /></router-link>
                </li>
                <!-- TODO: Implement notifications -->
                <li class="header-nav-icon">
                    <!-- title="Notifications" -->
                    <!-- <router-link to="/"><LucideIcon class="nav-icon cursor-pointer transition-all" name="Bell" :strokeWidth="2" /></router-link> -->
                    <button class="flex w-fit h-fit" type="button"><LucideIcon class="nav-icon cursor-pointer transition-all" name="Bell" :strokeWidth="2" /></button>
                </li>
                <li>
                    <!-- TODO: Show Avatar -->
                    <div v-if="user.avatar && user.avatar.length > 0"></div>
                    <div v-else class="header-nav-icon" id="">
                        <button type="button" class="dropdown-btn-user" id="authUser" aria-haspopup="menu">
                            <LucideIcon :class="{ 'active-element': router.currentRoute.value.path === '/profile'  }" class="transition-all" name="UserRound" :stroke-width="2" />
                        </button>
                        <ul class="dropdown-content px-2 py-3 right-0">
                            <li><router-link to="/profile">Profile</router-link></li>
                            <li><button @click="handleLogout">Logout</button></li>
                        </ul>
                    </div>
                </li>
            </template>
            <li class="flex">
                <button><LucideIcon class="shopping-bag transition-all" name="ShoppingBag" :strokeWidth="2"/></button>
            </li>
        </ul>
    </header>
</template>

<script lang="ts" setup>
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

<style scoped>
header {
    @apply  w-full mb-[87px] px-32 py-[1.5625rem] flex text-2xl border-b border-b-[#1b1b1b] bg-[#f8f8f8]
            fixed z-[9999]
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
    transform: scaleX(1) translate(0, 0);
    height: 5px;
}

.header-nav-icon .router-link-active > .nav-icon, .header-nav-icon > .router-link-active:hover > .nav-icon, .active-element, .active-element:hover {
    @apply text-rose-600 
    ;

    filter: 
        drop-shadow(0 5px 1px rgba(225, 29, 72, 0.25))
        drop-shadow(0 8px 4px rgba(225, 29, 72, 0.25))
        drop-shadow(0 12px 8px rgba(225, 29, 72, 0.25))
        drop-shadow(0 20px 16px rgba(225, 29, 72, 0.125))
        drop-shadow(0 6px 2px rgba(225, 29, 72, 0.25));
    scale: 1.1;
}

.dropdown-btn, .dropdown-btn-user {
    @apply flex gap-1 items-center cursor-pointer
    ;
}
.dropdown-btn:focus + .dropdown-content, .dropdown-btn-user:focus + .dropdown-content {
    @apply border-black visible opacity-100;
} 
.dropdown-btn:focus > .arrow {
    transform: rotate(180deg);
}
.dropdown-btn:focus + .dropdown-content li, .dropdown-btn-user:focus + .dropdown-content li {
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

.nav-right .dropdown-btn:hover, .nav-right .shopping-bag:hover, .nav-right .nav-icon:hover {
    filter: 
        drop-shadow(0 1px 1px hsl(0deg 0% 0% / 0.075))
        drop-shadow(0 4px 4px hsl(0deg 0% 0% / 0.075))
        drop-shadow(0 8px 8px hsl(0deg 0% 0% / 0.075))
        drop-shadow(0 16px 16px hsl(0deg 0% 0% / 0.075))
        drop-shadow(0 2px 2px hsl(0deg 0% 0% / 0.075));
    scale: 1.1;
}

</style>