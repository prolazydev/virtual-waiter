<template>
	<div class="w-full mx-auto p-32 py-8 pb-8 flex flex-col ">
        <div class="w-full h-fit flex gap-6 items-baseline bg-[#f8f8f8] z-50 relative top-0 transition-all duration-700">
            <div class="w-[27.5rem]"></div>
            <!-- TODO: Create Filter -->
            <div class="h-fit py-4 fixed flex flex-col gap-4 border border-gray-500 rounded-xl">
                <h2 class="px-3 pb-4 text-xl font-bold border-b border-b-gray-500">Filter By:</h2>
                <!-- TODO: Implement range filter for price with 2 inputs -->
                <div class="px-5 pb-4 flex flex-col gap-2 border-b border-b-gray-500">
                    <h3 class="text-lg font-semibold">Budget</h3>
                    <div class="flex gap-2 items-end">
                        <!-- TODO: Locale the price: Euro, Dollars -->
                        <p id="budgetFilter">{{ `${budgetRangeValues.value1} ${budgetRangeValues.value2}` }}</p>
                    </div>
                    <div class="range-slider pb-2">
                        <tc-range-slider v-pre id="budgetRangeSlider" value1="20" value2="30" ></tc-range-slider>
                    </div>
                </div>
                <div class="px-5 flex gap-2 flex-col">
                    <h3 class="text-lg font-semibold">Popular Filters:</h3>
                    <div class="flex flex-col gap-1">
                        <!-- TODO: Custom style checkbox -->
                        <Checkbox _label="Open Now" class="popular-filter" _id="openNowFilter" />
                        <Checkbox _label="Parking" class="popular-filter" _id="parkingFilter" />
                        <Checkbox _label="Hotel" class="popular-filter" _id="hotelFilter" />
                        <Checkbox _label="Pets Allowed" class="popular-filter" _id="petsAllowedFilter" />
                        <Checkbox _label="Pets Allowed" class="popular-filter" _id="petsAllowedFilter2" />
                    </div>
                </div>
            </div>
            <div class="w-full relative flex flex-col ">
                <div class="h-[6.25rem] inline-block opacity-0 pointer-events-none">placeholder</div>
                <div class="search-board h-32 pt-9 fixed top-16 flex items-center justify-start bg-[#f8f8f8] border-b-4 border-[#1b1b1b] z-[1000]">
                    <div class="flex items-center">
                        <div class="relative px-1 py-2 border border-gray-500 hover:bg-neutral-800/5 rounded-full transition-all">
                            <button type="button" class="dropdown-btn font-semibold text-lg" aria-haspopup="menu">
                                <LucideIcon name="ArrowUpDown" :size="32" />
                                    Sort by: {{ sortOption }}
                                <LucideIcon  name="ChevronsUpDown" :size="32" />
                            </button>
                            <ul class="dropdown-sort-options left-[-10px]">
                                <li @click="sortOption = item" v-for="(item, index) in ESortType" class="px-4" :key="index">
                                    <p>{{ item }}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-3 h-3 mx-auto bg-rose-600 origin-center rounded-full"></div>
                    <div class="search-shortcuts flex gap-10">
                        <button type="button">
                            <p>Hot now</p>
                            <LucideIcon name="Flame" :strokeWidth="2" />
                        </button>
                        <button type="button">
                            <p>New</p>
                            <LucideIcon name="CookingPot" :strokeWidth="2" />
                        </button>
                        <button type="button">
                            <p>Close to you</p>
                            <LucideIcon name="Telescope" :strokeWidth="2" />
                        </button>
                        <button type="button">
                            <p>Surprise me</p>
                            <LucideIcon name="Cookie" :strokeWidth="2" />
                        </button>
                    </div>
                    <div class="w-3 h-3 mx-auto bg-rose-600 origin-center rounded-full"></div>
                </div>
                <div class="flex flex-col gap-5">
                    <!-- TODO: Show results here -->
                    <div class="search-items ">
                        <SearchItem v-for="index in 10" :key="index" 
                            r-name="Artro" 
                            city-of-origin="Ferizaj" 
                            photo="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.myfitnesspal.com%2Fwp-content%2Fuploads%2F2017%2F12%2FEssential-Guide-to-Healthy-Eating-2.png&f=1&nofb=1&ipt=a0a4fe3926f2c453777359ed46a0c88354e9ab138068354c1c67fe44ff807eec&ipo=images"
                            type-of-business="Burgers" 
                            :stars="4"
                            :reviews="5"
                            :time-open="'10:00'" 
                            :time-closing="'23:00'"
                            :time-now="timeNow"
                            :top-rated-review="test"
                        />
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script lang="ts" setup>
import 'toolcool-range-slider';

import { type SliderEvent } from '@/types'
import { ESortType } from '@/types';

const { toHourMinute } = myTime();

// const { isAuth } = useAuth();
// const { user } = useUserStore();
// const query = useRoute().query;

// const searchProps = ref({
//     searchType: 'general',
//     query: ''
// });
const searching = ref(false);

const sortOption = ref<ESortType>(ESortType.TopPicks);

const budgetRangeValues = ref({
    value1: 20,
    value2: 30
});

const currentTime = ref('');

// const timeNow = ref<Date>(new Date(Date.now() - (2 * 60 * 60 * 1000)));
const timeNow = ref<string>(toHourMinute(new Date()));
let timeNowIntervalId: NodeJS.Timeout;

onMounted(() => {
	// console.log(query);
    // if (query.searchType && query.query) {
    //     // TODO: Implement automatic search
    // }

    timeNowIntervalId = setInterval(() => 
        timeNow.value = toHourMinute(new Date())
    , 60000); // Update every minute

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

    clearTimeout(timeNowIntervalId)
})
onUnmounted(() => {});

// TODO: Remove later
const test = `One of my go to places for salads in Frankfurt. 
                    It's not cheap, I would rather say good value. 
                    Fresh ingredients and great add-ons that you can either buy as pre-set salads or build your own.
                    The soups, wraps and curries are also good and contains fresh and healthy ingredients.
                    This place really makes you feel good about eating healthy.
                    The staff is always friendly and helpful.`

// TODO: Implement search
// @ts-expect-error 
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
.popular-filter {
    @apply pl-7
}
.popular-filter > span {
    @apply w-5 h-5
}

.popular-filter .checkbox-label:after {
    @apply  left-[4.5px] top-[0.075rem] w-[0.5rem] h-[0.9rem] border-r-[4px] border-b-[4px] 
	;
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
    @apply  px-6 py-2 bg-[#1b1b1b] border-4 border-black text-white text-xl relative duration-200
            capitalize overflow-hidden
            hover:cursor-pointer
            focus:outline-none 
            focus-visible:border-b-rose-600 
            active:border-b-white 
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

.hide-title {
    @apply -top-5 opacity-0 pointer-events-none
}

.search-board {
    width: calc(100% - 622px);
}

.search-results {
    @apply mt-1 opacity-100 pointer-events-auto
}

.search-items {
    @apply h-full flex flex-wrap justify-between gap-y-10 overflow-hidden
}
</style>