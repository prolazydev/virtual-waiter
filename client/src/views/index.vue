<template>
    <div id="homePage">
        <section class="glider-container relative w-full slide-height-max overflow-hidden max-w-[100vw]">
            <div data-glide-el="track">
                <!-- NOTE: Needs flex to work -->
                <ul id="homeSliderImages" class="flex">
                    <li class="home-slide relative w-screen">
                        <img class="object-cover w-screen slide-height" src="@/assets/general/spaghetti_sm.jpg"
                            alt="spaghetti" />
                        <div class="absolute-center slide-1">
                            <h1 class="text-4xl font-bold drop-shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">For all of the Food Enthusiast!</h1>
                            <p>Explore and find the best food for your belly 😋</p>
                            <p class="capitalize">Get started!</p>
                            <LucideIcon class="down-arrow relative top-[4.5rem]" name="MoveDown" :size="48" />
                            <div @click="scrollToAboutUs" class="absolute opacity-0 w-16 h-40 border-2 rounded-full cursor-pointer translate-y-[15rem]"></div>
                        </div>
                    </li>
                    <li class="home-slide relative w-screen">
                        <img class="object-cover w-screen slide-height"
                            src="@/assets/general/pasta_sm.jpg" alt="spaghetti" />
                        <div class="absolute-center slide-2">
                            <div class="flex gap-2 items-baseline">
                                <p class="flex items-baseline gap-2 text-3xl text-white">See what are the top rating places are serving</p>
                                <h1 class="text-5xl">today!</h1> 
                            </div>
                            <button class="search-now-button px-4 py-3 bg-black">
                                <p>Go now!</p>
                                <LucideIcon name="ChefHat" :size="32" :stroke-width="2"  />
                            </button>
                        </div>
                    </li>
                    <li class="home-slide relative w-screen">
                        <img class="object-cover w-screen slide-height"
                            src="@/assets/general/beef_sm.jpg" alt="spaghetti" />
                        <div class="absolute-center slide-3">
                            <h1>Looking to show off your cuisine?</h1>
                            <p>We got you covered!</p>
                            <button class="register-button" type="button">
                                <router-link to="/register">Register Here!</router-link>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <section id="aboutUs" class="home-container">
            <div class="w-3 h-3 mx-auto bg-rose-600 origin-center rounded-full"></div>
            <h2 class="mx-auto relative w-fit text-3xl font-semibold uppercase">About us</h2>
            <p class="text-justify leading-normal">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, consequatur sunt nobis tenetur eos assumenda accusantium molestiae consequuntur, 
                mollitia nostrum eius asperiores eum obcaecati inventore numquam fugiat. Officia impedit error inventore alias sapiente ratione voluptatum ab aliquid tenetur 
                laudantium id quis adipisci, sit, aut at temporibus, quasi in repudiandae eius laboriosam expedita magni reiciendis dignissimos. Voluptas, ratione repellendus 
                sequi ullam ipsa porro aperiam dolorum quidem at sit labore voluptate vel veniam corporis veritatis perspiciatis rem nihil molestias officiis incidunt ut. 
                Possimus aliquid similique accusantium reprehenderit facere amet delectus pariatur architecto in, voluptatum repellat maxime voluptas ad dicta animi eaque 
                atque quo explicabo molestiae voluptate perspiciatis eum praesentium nemo? Illum iure at facilis consectetur modi iste, ex, enim impedit consequuntur amet 
                soluta itaque repellat doloribus a. Provident, eveniet repellat.
            </p>
            <h2 class="mx-auto relative w-fit text-3xl font-semibold uppercase">What we do</h2>
            <div class="flex justify-between">
                <div class="max-w-[300px] flex flex-col gap-5">
                    <div class="relative w-fit mx-auto">
                        <LucideIcon class="stroke-rose-600 relative -left-1 hover:translate-x-1 hover:translate-y-3 z-10 transition-all" name="Search" :size="128" />
                        <LucideIcon class="absolute top-3 stroke-rose-600 opacity-25" name="Search" :size="128" />
                    </div>
                    <h3 class="font-bold text-center">Always on a Lookout</h3>
                    <p class="text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, vero.</p>
                </div>
                <div class="max-w-[300px] flex flex-col gap-5">
                    <div class="relative w-fit mx-auto">
                        <LucideIcon class="stroke-rose-600 relative hover:translate-x-0 hover:translate-y-3 z-10 transition-all" name="MessageCircleDashed" :size="128" />
                        <LucideIcon class="absolute top-3 stroke-rose-600 opacity-25" name="MessageCircleDashed" :size="128" />
                    </div>
                    <h3 class="font-bold text-center">Less talk, more Food</h3>
                    <p class="text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, vero.</p>
                </div>
                <div class="max-w-[300px] flex flex-col gap-5">
                    <div class="relative w-fit mx-auto">
                        <LucideIcon class="stroke-rose-600 relative left-1 hover:-translate-x-1 hover:translate-y-3 z-10 transition-all" name="Scan" :size="128" />
                        <LucideIcon class="absolute top-3 stroke-rose-600 opacity-25" name="Scan" :size="128" />
                    </div>
                    <h3 class="font-bold text-center">Optimized Search</h3>
                    <p class="text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, vero.</p>
                </div>
            </div>
            <div class="w-3 h-3 mx-auto bg-rose-600 origin-center rounded-full"></div>
        </section>
        <section id="statistics" class="home-container bg-rose-950 text-white">
            <h2 class="mx-auto relative w-fit text-3xl font-semibold uppercase">We&#x2019;re Good with Numbers</h2>
            
            <!-- TODO: Add some statistics -->
            <div class="flex flex-col gap-8">
                <div class="w-full flex justify-center ">
                    <div class="w-full flex gap-20">
                        <div class="w-full flex justify-end gap-20">
                            <div class="flex flex-col justify-center items-center text-center gap-5">
                                <h3 id="statisticsRestaurants" class="text-7xl font-bold text-center"></h3>
                                <p class="text-center">Restaurants</p>
                            </div>
                            <LucideIcon class="stroke-rose-200 mt-9" name="Dot" :size="14" :stroke-width="14" />
                             <!-- <div class="w-3 mb-[75px] border-b-4 border-b-rose-200 overflow-visible"></div> -->
                            <div class="flex flex-col gap-5">
                                <h3 id="statisticsProducts" class="text-7xl font-bold text-center"></h3>
                                <p class="text-center">Products</p>
                            </div>
                        </div>
                        <LucideIcon class="w-8 stroke-rose-200 mt-9" name="Dot" :size="14" :stroke-width="14" />
                         <!-- <div class="w-3 min-w-3 mb-[75px] border-b-4 border-b-rose-200 overflow-visible"></div> -->
                        <div class="w-full flex justify-start gap-20 overflow-visible">
                            <div class="flex flex-col gap-5">
                                <h3 id="statisticsUsers" class="text-7xl font-bold text-center overflow-visible"></h3>
                                <p class="text-center">Users</p>
                            </div>
                            <LucideIcon class="stroke-rose-200 mt-9 overflow-visible" name="Dot" :size="14" :stroke-width="14" />
                             <!-- <div class="w-3 mb-[75px] border-b-4 border-b-rose-200 overflow-visible"></div> -->
                            <div class="flex flex-col gap-5">
                                <h3 id="statisticReviews" class="text-7xl font-bold text-center overflow-visible"></h3>
                                <p class="text-center">Reviews</p>
                            </div>
                        </div>
                    </div>
                </div>


                <h2 class="mx-auto relative w-fit text-sm text-gray-100">More coming soon</h2>

                <!-- <LucideIcon class="mx-auto stroke-rose-200 mt-9" name="Dot" :size="14" :stroke-width="14" /> -->
            </div>

        </section>
    </div>
</template>

<script lang="ts" setup>
import Glide from '@glidejs/glide'
// import { useScrollTo } from '@/composables/useScrollTo';
// import { initGlideStatistics } from '@/composables';
const { observeSlide1, observeSlide2, observeSlide3 } = useSlider().homeSlider();

// const virtualWaiterData = ref({
//     restaurants: 45,
//     products: 850,
//     users: 100,
//     reviews: 1000,
// })

let glide: Glide;

onMounted(() => {
    glide = new Glide('.glider-container', {
        type: 'carousel',
        perView: 1,
        gap: 0,

        autoplay: false,
        hoverpause: true,

        breakpoints: {
            1024: {
                perView: 2,
                gap: 0,
            }
        }
    });
    glide.mount();

    const slides = document.querySelectorAll('.home-slide:not(.glide__slide--clone)');
    (slides[0].childNodes[1].childNodes[0] as HTMLElement).style.animation = 'appear-from-left 1s ease 0s 1 normal forwards running';
    (slides[0].childNodes[1].childNodes[1] as HTMLElement).style.animation = 'appear-from-right 1s ease 0.2s 1 normal forwards running';
    // (slides[0].childNodes[1].childNodes[2] as HTMLElement).style.animation = 'appear-from-bottom 1s ease 0.5s 1 normal forwards running';
    (slides[0].childNodes[1].childNodes[3] as HTMLElement).style.animation = 'go-down 2.5s ease 1.5s infinite';


    observeSlide1.observe(slides[0]);
    observeSlide2.observe(slides[1]);
    observeSlide3.observe(slides[2]);

    // initGlideStatistics();
    useFlipStatistics();
})

onUnmounted(() => {
    observeSlide1.disconnect();
    observeSlide2.disconnect();
    observeSlide3.disconnect();
    glide.destroy();
})

function scrollToAboutUs() {
    useScrollTo('aboutUs');
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Courgette&family=Montserrat:wght@200;300;400;500;600;800&family=Space+Mono&display=swap');

.slide-height {
    height: calc(100vh - 64px);
}

.slide-height-max {
    max-height: calc(100vh - 64px);

    background: transparent;
}

#homeSliderImages {
    @apply text-white
    ;
}

.slide-1, .slide-2, .slide-3 {
    @apply  flex flex-col justify-center items-center gap-10
    ;
}

.slide-1 p, .slide-2 p, .slide-3 p {
    @apply text-[2.0625rem] opacity-0 font-light leading-10 
    ;
}

.slide-1 h1, .slide-2 h1, .slide-3 h1 {
    @apply text-6xl opacity-0
    ;
    font-family: "Courgette", cursive;
}

.down-arrow {
    @apply opacity-0
    ;
}

#homeSliderImages img {
    filter: brightness(0.45);
}

.slide-2 p {
    @apply text-4xl
    ;
}
.slide-2 h1 {
    @apply text-4xl capitalize
}

.search-now-button {
    @apply relative text-3xl overflow-hidden opacity-0 cursor-pointer transition-transform duration-500
}

.search-now-button > p {
    @apply text-2xl opacity-100 capitalize transition-transform duration-500
    ;
}

.search-now-button:hover > p {
    @apply translate-y-[calc(-50%-40px)] duration-500
}

.search-now-button svg {
    @apply absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[calc(-50%+45px)] transition-transform duration-500
    ;
}

.search-now-button:hover > svg {
    @apply -translate-y-1/2
}

.register-button {
    @apply px-4 py-3 opacity-0 underline underline-offset-[1.5rem] overflow-hidden transition-all
    
    hover:text-black hover:underline-offset-8 hover:duration-500
    ;
}

.register-button::before {
    background: #000;
    content: "";
    inset: 0;
    position: absolute;
    transform: scaleX(1);
    transform-origin: left;
    transition: transform 0.35s ease;
    z-index: -1;
}

.register-button:hover::before {
    transform: scaleX(0);
    transform-origin: right;
}

.register-button::after {
    background: #fff;
    content: "";
    inset: 0;
    position: absolute;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.35s ease;
    z-index: -1;
}

.register-button:hover::after {
    transform: scaleX(1);
    transform-origin: left;
}

/* About us SECTION */
.about-us-container {
    @apply py-24 px-64 flex flex-col gap-10 max-w-[100vw]
}

.home-container {
    @apply py-24 px-64 flex flex-col gap-10 max-w-[100vw]
}
/* .about-us-container > h2::before {
    @apply  absolute w-3 h-3 bg-rose-600 origin-center rounded-full
            transition-all content-['']
    ;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -500%);
} */
/* 
.about-us-container h2 {
    
} */

</style>

<style>
@keyframes go-down {
    0% {
        transform: translateY(0px);
        opacity: 0;
    }

    55% {
        transform: translateY(35px);
        opacity: 1;
    }
    65% {
        transform: translateY(35px);
        opacity: 1;
    }

    100% {
        transform: translateY(70px);
        opacity: 0;
    }
}

@keyframes appear-from-left {
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes appear-from-right {
    0% {
        transform: translateX(100px);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes appear-from-bottom {
    0% {
        transform: translateY(100px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
@keyframes fade-in {
    to {
        opacity: 1;
    }
}
</style>