<template>
	<div class="w-full mx-auto p-32 pb-8 flex flex-col ">
		<!-- TODO: Create a top 3 above the search or a carousel -->
        <div :class="{ 'move-form-up': searching }" class="w-[86.5%] mt-full px-8 pb-4 border-b-4 border-[#1b1b1b] bg-[#f8f8f8] flex flex-col fixed top-36 z-50 transition-all duration-700">
            <div :class="{ 'hide-title': searching }" class="h-fit flex flex-col gap-3 overflow-hidden relative top-0 opacity-100 transition-all duration-700">
                <h2 class="text-5xl font-bold">Where to next, {{ isAuth() ? user.username : '' }}?</h2>
                <p class="text-3xl ">Uncover the best culinary choice tailored specifically to you!</p>
            </div>
            <div class="h-fit mt-20 flex gap-5 items-center relative top-0 transition-all duration-700">
                <form @submit.prevent="handleSearch" class="w-fit pl-2 flex items-center text-xl border-4 border-[#1b1b1b]">
                    <div class="relative">
                        <button type="button" class="dropdown-btn" aria-haspopup="menu">
                            <LucideIcon id="searchTypeIcon" class="flex margin-auto stroke-[#1b1b1b]" :name="searchType" :size="32" :strokeWidth=2 />
                            <span class="arrow"></span>
                        </button>
                        <ul class="dropdown-content left-[-10px]">
                            <li @click.prevent="searchProps.searchType = 'general'"><p>General</p></li>
                            <li @click.prevent="searchProps.searchType = 'restaurants'"><p>Restaurants</p></li>
                            <li @click.prevent="searchProps.searchType = 'foods'"><p>Foods</p></li>
                        </ul>
                    </div>
                    <input v-model="searchProps.query" class="w-[32rem] px-6 py-3 border-x-4 border-[#1b1b1b] bg-transparent focus:outline-none outline-none transition-all" type="text" placeholder="Where are we dining?">
                    <button class="relative px-6" type="submit">
                        <!-- TODO: Finding animation -->
                        <LucideIcon class="animate-ping opacity-0 -z-[1] pointer-events-none" name="Search" color="black" :size="32" :strokeWidth="2" />
                        <LucideIcon class="absolute-center hover:stroke-[3px] hover:cursor-pointer transition-all" name="Search" :size="32" :strokeWidth="2" />
                    </button>
                </form>
                <div class="w-3 h-3 mx-auto bg-rose-600 origin-center rounded-full"></div>
                <div class="search-shortcuts flex gap-10">
                    <button id="hotNowButton" type="button">
                        <p>Hot now</p>
                        <LucideIcon name="Flame" :size="36" :strokeWidth="2" />
                    </button>
                    <button type="button">
                        <p>New</p>
                        <LucideIcon name="CookingPot" :size="36" :strokeWidth="2" />
                    </button>
                    <button type="button">
                        <p>Close to you</p>
                        <LucideIcon name="Telescope" :size="36" :strokeWidth="2" />
                    </button>
                    <button type="button">
                        <p>Surprise me</p>
                        <LucideIcon name="Cookie" :size="36" :strokeWidth="2" />
                    </button>
                </div>
                <div class="w-3 h-3 mx-auto bg-rose-600 origin-center rounded-full"></div>
                <!-- <div class="w-full h-1 bg-[#1b1b1b]"></div> -->
            </div>
        </div>
        <!-- <div :class="{ 'search-divider': searching }" class="h-64 w-full fixed transition-all duration-700"></div> -->
        <div :class="{ 'search-results': searching }" class="mt-0 flex gap-10 transition-all duration-700">
            <!-- TODO: Create Filter -->
            <div class="h-fit py-4 flex flex-col gap-4 border border-[#1b1b1b] rounded-xl">
                <h2 class="px-3 pb-4 text-xl font-bold border-b border-b-[#1b1b1b]">Filter By:</h2>
                <!-- TODO: Implement range filter for price with 2 inputs -->

                <div class="px-3 pb-4 flex flex-col gap-2 border-b border-b-[#1b1b1b]">
                    <div class="flex gap-2 items-end">
                        <label class="text-lg" for="budgetFilter">Budget range: </label>
                        <p>{{ `${budgetRangeValues.value1} ${budgetRangeValues.value2}` }}</p>
                    </div>
                    <div class="range-slider pb-2">
                        <tc-range-slider v-pre id="budgetRangeSlider" value1="20" value2="30" ></tc-range-slider>
                        
                    </div>
                </div>

                <div class="px-3 flex flex-col">
                    <h3>Filters:</h3>
                    <div class="flex flex-col ">
                        <!-- TODO: Custom style checkbox -->
                        <Checkbox label="Open Now" id="openNowFilter" />
                        <Checkbox label="Parking" id="parkingFilter" />
                        <Checkbox label="Hotel" id="hotelFilter" />
                        <Checkbox label="Pets Allowed" id="petsAllowedFilter" />
                        <Checkbox label="Pets Allowed" id="petsAllowedFilter2" />
                        <!-- <label for="petsAllowedFilter">
                            <input type="checkbox" name="petsAllowedFilter" id="petsAllowedFilter" class="">
                            Pets Allowed
                        </label> -->
                        <!-- <label for="">

                            <input type="checkbox" name="" id="" class="">
                        </label>
                        <label for="">

                            <input type="checkbox" name="" id="" class="">
                        </label> -->
                    </div>
                </div>
            </div>
            <div>
                <div class="flex flex-col gap-5">
                    <div class="flex gap-10 items-center">
                        <div class="relative px-1 py-2 border border-[#1b1b1b] hover:bg-neutral-800/5 rounded-full transition-all">
                            <button type="button" class="dropdown-btn font-semibold text-lg" aria-haspopup="menu">
                                <LucideIcon name="ArrowUpDown" :size="32" />
                                Sort by: {{ sortOption }}
                                <LucideIcon  name="ChevronsUpDown" :size="32" />
                            </button>
                            <ul class="dropdown-sort-options left-[-10px]">
                                <li @click="sortOption = item" v-for="(item, index) in ESortType" class="px-4" :key="index">
                                    <p>{{ item }}</p>
                                </li>
                                <!-- <li @click.prevent="searchProps.searchType = 'general'"><p>General</p></li>
                                <li @click.prevent="searchProps.searchType = 'restaurants'"><p>Restaurants</p></li>
                                <li @click.prevent="searchProps.searchType = 'foods'"><p>Foods</p></li> -->
                            </ul>
                        </div>

                        <div class="w-3 h-3 mx-auto bg-rose-600 origin-center rounded-full"></div>
                    </div>
                    <!-- TODO: Show results here -->
                    <div class="flex gap-10">
                        <div class="px-5 py-3 border border-[#1b1b1b] rounded-xl">
                            <p>Lorem, ipsum dolor.</p>
                            <p>In, laudantium assumenda.</p>
                            <p>Reiciendis, cupiditate tenetur.</p>
                            <p>Odit, quaerat hic.</p>
                            <p>Voluptatum, fuga necessitatibus.</p>
                            <p>Quas, odit. Consectetur.</p>
                            <p>Maxime, molestiae pariatur?</p>
                            <p>Accusamus, veniam repudiandae!</p>
                            <p>Ab, tenetur atque.</p>
                            <p>Ipsa, assumenda blanditiis.</p>
                            <p>Qui, omnis tenetur.</p>
                            <p>Illo, dolores? Nisi?</p>
                            <p>Est, in ea.</p>
                            <p>Repellat, quibusdam dolor.</p>
                            <p>Quam, dolor beatae.</p>
                            <p>Optio, error laboriosam.</p>
                            <p>Natus, ducimus obcaecati?</p>
                            <p>Rerum, voluptate ut!</p>
                            <p>Aliquam, modi aspernatur?</p>
                            <p>Distinctio, ea at.</p>
                            <p>Lorem, ipsum dolor.</p>
                            <p>In, laudantium assumenda.</p>
                            <p>Reiciendis, cupiditate tenetur.</p>
                            <p>Odit, quaerat hic.</p>
                            <p>Voluptatum, fuga necessitatibus.</p>
                            <p>Quas, odit. Consectetur.</p>
                            <p>Maxime, molestiae pariatur?</p>
                            <p>Accusamus, veniam repudiandae!</p>
                            <p>Ab, tenetur atque.</p>
                            <p>Ipsa, assumenda blanditiis.</p>
                            <p>Qui, omnis tenetur.</p>
                            <p>Illo, dolores? Nisi?</p>
                            <p>Est, in ea.</p>
                            <p>Repellat, quibusdam dolor.</p>
                            <p>Quam, dolor beatae.</p>
                            <p>Optio, error laboriosam.</p>
                            <p>Natus, ducimus obcaecati?</p>
                            <p>Rerum, voluptate ut!</p>
                            <p>Aliquam, modi aspernatur?</p>
                            <p>Distinctio, ea at.</p>  <p>Lorem, ipsum dolor.</p>
                            <p>In, laudantium assumenda.</p>
                            <p>Reiciendis, cupiditate tenetur.</p>
                            <p>Odit, quaerat hic.</p>
                            <p>Voluptatum, fuga necessitatibus.</p>
                            <p>Quas, odit. Consectetur.</p>
                            <p>Maxime, molestiae pariatur?</p>
                            <p>Accusamus, veniam repudiandae!</p>
                            <p>Ab, tenetur atque.</p>
                            <p>Ipsa, assumenda blanditiis.</p>
                            <p>Qui, omnis tenetur.</p>
                            <p>Illo, dolores? Nisi?</p>
                            <p>Est, in ea.</p>
                            <p>Repellat, quibusdam dolor.</p>
                            <p>Quam, dolor beatae.</p>
                            <p>Optio, error laboriosam.</p>
                            <p>Natus, ducimus obcaecati?</p>
                            <p>Rerum, voluptate ut!</p>
                            <p>Aliquam, modi aspernatur?</p>
                            <p>Distinctio, ea at.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script lang="ts" setup>
import 'toolcool-range-slider';

import { type SliderEvent } from '@/types'

import { useAuth } from '@/composables/useAuth';
import { useUserStore } from '@/stores/user';
import { ESortType, type IconKeys } from '@/types';


const { isAuth } = useAuth();
const { user } = useUserStore();
const query = useRoute().query;

const searchProps = ref({
    searchType: 'general',
    query: ''
});
const searching = ref(false);

const sortOption = ref<ESortType>(ESortType.PriceHighToLow);

const budgetRangeValues = ref({
    value1: 20,
    value2: 30
});

const currentTime = ref('');

onMounted(() => {
	console.log(query);
    // if (query.searchType && query.query) {
    //     // TODO: Implement automatic search
    // }

    setInterval(() =>                                           
        currentTime.value = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        , 1000);
	// TODO: Implement search
    const mySlider = document.getElementById('budgetRangeSlider')! as HTMLElement & { min: number, max: number };
    // TODO: Implement range slider for budget (take mix and max values from the backend for budget range)
    mySlider.min = 20;
    mySlider.max = 75;

    // @ts-expect-error no typing for this event
    mySlider.addEventListener('change', (e: SliderEvent<typeof budgetRangeValues.value>) => setBudget(e))
    
    
});

onBeforeUnmount(() => {
    searching.value = false;
    document.getElementById('budgetRangeSlider')!
        // @ts-expect-error no typing for this event
        .removeEventListener('change', (e: SliderEvent<typeof budgetRangeValues.value>) => setBudget(e))
})
onUnmounted(() => {
    

});
watch(() => searchProps.value.searchType, () => {
    setTimeout(() => {
        const searchTypeIcon = document.getElementById('searchTypeIcon')!;

        searchTypeIcon.style.animation = 'strokeOffset 0.7s ease 0s 1 normal forwards';
    }, 0);
})

const searchType = computed<IconKeys>(() => {
    if (searchProps.value.searchType === 'general') 
        return 'Zap'
    else if (searchProps.value.searchType === 'restaurants') 
        return 'ChefHat'
    else if (searchProps.value.searchType === 'foods') 
        return 'CookingPot'
        
    return 'Zap';
});

async function handleSearch() {
    if (!searching.value) 
        searching.value = true;

    // await router.push( { name: 'searchDashboard', query: { 
    //         searchType: searchProps.value.searchType, 
    //         query: searchProps.value.query
    //     }
    // });

}
const setBudget = (e: SliderEvent<typeof budgetRangeValues.value>) => {
    budgetRangeValues.value.value1 = e.detail.value1;
    budgetRangeValues.value.value2 = e.detail.value2;
};

</script>

<style>
@keyframes strokeOffset {
    to {
        stroke-dashoffset: 140;
    }
}
</style>

<style scoped>
#searchTypeIcon {
    stroke-dasharray: 70;
    stroke-dashoffset: 0;
}

.dropdown-btn {
    @apply mr-3 ml-2 flex gap-3 items-center cursor-pointer
    ;
}
.dropdown-btn:focus + .dropdown-content, .dropdown-btn:focus + .dropdown-sort-options {
    @apply border-black visible opacity-100;
} 
.dropdown-btn:focus > .arrow {
    transform: rotate(180deg);
}
.dropdown-btn:focus + .dropdown-content li, .dropdown-btn:focus + .dropdown-sort-options li {
    @apply opacity-100 pointer-events-auto;
}

.arrow {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #000;
    transition: transform ease 0.3s;
}


.dropdown-content {
    @apply  flex flex-col gap-1 w-fit text-start border-2 border-[#1b1b1b] bg-white opacity-0 transition-all 
            absolute top-16 shadow-lg
            pointer-events-none hover:pointer-events-auto hover:opacity-100 
    ;
}
.dropdown-content:hover > li {
    @apply  opacity-100 pointer-events-auto;
}

.dropdown-content li {
    @apply  px-1 py-1 relative bg-white cursor-pointer opacity-0 transition-all z-10
            border-b-4 border-b-transparent 
            pointer-events-none
            hover:border-b-rose-600 
    ;
}


.dropdown-sort-options {
    @apply  flex flex-col gap-1 w-fit text-start border-2 border-[#1b1b1b] bg-white opacity-0 transition-all 
            absolute top-16 left-0 rounded-xl shadow-md overflow-hidden
            pointer-events-none hover:pointer-events-auto hover:opacity-100 
    ;
}
.dropdown-sort-options:hover > li {
    @apply  opacity-100 pointer-events-auto;
}

.dropdown-sort-options li {
    @apply  px-4 py-3 relative bg-white cursor-pointer opacity-0 transition-all z-10
            border-b-4 border-b-transparent 
            pointer-events-none
            hover:border-b-rose-600 
    ;
}

.search-shortcuts {
    font-family: 'Avenir', Helvetica, Arial, sans-serif; ; 
}

.search-shortcuts p, .search-shortcuts svg, .search-shortcuts button {
    @apply transition-all duration-500
}

.search-shortcuts button {
    @apply  px-6 py-3 bg-[#1b1b1b] border-4 border-black text-white text-xl relative
            capitalize overflow-hidden
            focus:outline-none focus:duration-200
            focus-visible:border-b-rose-600 
            active:border-b-white active:duration-200
    ;
}

.search-shortcuts svg {
    @apply  absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-12 
}
.search-shortcuts button:hover svg {
    @apply  -translate-y-1/2
}

.search-shortcuts button:hover p {
    @apply  -translate-y-14
}


.move-form-up {
    z-index: 10;
    /* top: -16rem; */
    /* top: -2.5rem;
    position: fixed; */
    top: -2.5rem;
    /* animation: move-form-up 1s ease 0s 1 forwards; */
}

@keyframes move-form-up {
    to {
        
    }
}

.move-search-up {
    top: -5rem;
}

.hide-title {
    @apply -top-5 opacity-0 pointer-events-none
    /* top: -2.5rem;
    opacity: 0;
    pointer-events: none; */
    /* animation: shrink 1s ease 0s 1 forwards; */
}

@keyframes shrink {
    from {
        @apply h-full
    }
    to {
        @apply h-[-5rem] opacity-0 pointer-events-none 
    }
}
.search-divider {
    @apply h-32  top-52;
    background: linear-gradient(180deg, rgba(248,248,248,1) 0%, rgba(255,255,255,0) 100%);

    /* background-color: red; */
}

.search-results {
    @apply mt-20 
}


</style>