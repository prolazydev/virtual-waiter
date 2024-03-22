<template>
    <footer>
        <div class="min-w-64 w-64 flex flex-col gap-3 text-start">
            <h1 class="text-3xl font-bold text-white">Virtual<span class="text-[#07B889]">Waiter</span></h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore aspernatur fuga consequuntur laborum quae commodi.</p>
        </div>
            
       <div class="w-full mt-2 flex justify-around gap-20">
            <div id="exploreLinks" class="footer-links flex flex-col gap-4">
                <h2 class="relative w-fit uppercase">Explore</h2>
                <div class="flex flex-col gap-1 items-start">
                    <router-link to="/">Home</router-link>
                    <router-link to="/about">About</router-link>
                    <!-- <router-link to="/contact">Contact</router-link> -->
                </div>
            </div>
            <div id="getStartedLinks" class="footer-links flex flex-col gap-4">
                <h2 class="relative w-fit uppercase">Get started</h2>
                <div class="flex flex-col gap-1 items-start">
                    <router-link to="/login">Login</router-link>
                    <router-link to="/register">Register</router-link>
                </div>
            </div>
            
            <div class="footer-links flex flex-col gap-5">
                <h2 class="relative w-fit uppercase">Socials</h2>
                <div class="flex gap-2 -translate-x-2">
                    <LucideIcon class="cursor-pointer" name="Facebook" :size="36" :stroke-width="2" />
                    <LucideIcon class="cursor-pointer" name="Twitter" :size="36" :stroke-width="2" />
                    <LucideIcon class="cursor-pointer" name="Instagram" :size="36" :stroke-width="2" />
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>

</script>

<style scoped>
footer {
    @apply flex mt-auto p-12 px-32 w-full bg-[#1b1b1b] text-white text-center ;
}
/* bg-[#0E0E10], #242424 */

a {
    @apply 
            hover:underline
			;
}

.footer-links h2::before {
    content: '';
    @apply  absolute -bottom-1 block w-4 h-1 bg-white
            ;
}

.footer-links .router-link-active {
    @apply underline
}
</style>