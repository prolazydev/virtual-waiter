<template>
    <footer>
        <div class="min-w-64 w-64 flex flex-col gap-3 text-start">
            <h1 class="text-3xl font-bold text-white">Virtual<span class="color-theme-green">Waiter</span></h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore aspernatur fuga consequuntur laborum quae commodi.</p>
        </div>
            
       <div class="w-full flex justify-evenly gap-20">
            <div id="exploreLinks" class="footer-links">
                <h2>Explore</h2>
                <div class="flex flex-col gap-1 items-start">
                    <router-link to="/">Home</router-link>
                    <router-link to="/search">Discover</router-link>
                    <router-link to="/about">About</router-link>
                    <router-link to="/contact">Contact</router-link>
                </div>
            </div>
            <div id="getStartedLinks" class="footer-links">
                <h2>Get started</h2>
                <div class="flex flex-col gap-1 items-start">
                    <router-link to="/login">Login</router-link>
                    <router-link to="/register">Sign Up</router-link>
                    <router-link to="/business/create">Create Your Business</router-link>
                </div>
            </div>
            
            <div id="socialLinks" class="footer-links">
                <h2>Socials</h2>
                <div class="my-auto -translate-y-5 flex gap-2 -translate-x-2">
                    <a href="#"><LucideIcon name="Facebook" :size="36" :stroke-width="2" /></a>
                    <a href="#"><LucideIcon name="Twitter" :size="36" :stroke-width="2" /></a>
                    <a href="#"><LucideIcon name="Instagram" :size="36" :stroke-width="2" /></a>
                </div>
            </div>
        </div>

        <div class="flex relative">
            <div class="w-4 h-4 absolute top-1/2 -left-[7.5rem] -translate-y-1/2 rounded-full bg-white"></div>
            <div class="w-1 bg-white"></div>
        </div>
    </footer>
</template>

<script lang="ts" setup>

</script>

<style scoped>
/* TODO: Add bg-[#1b1b1b] as a tailwind color to have it everywhere */
footer {
    @apply w-full mt-auto p-12 px-32 flex bg-[#1b1b1b] text-white text-center ;
}
/* bg-[#0E0E10], #242424 */

a {
    @apply 
            hover:underline
    ;
}

.footer-links {
    @apply flex flex-col gap-4
}

.footer-links h2 {
    @apply relative w-fit uppercase font-semibold
}

.footer-links h2::before {
    content: '';
    @apply  absolute -bottom-1 block w-4 h-1 bg-white
    ;
}

.footer-links a {
    @apply text-white cursor-pointer
}

.footer-links .router-link-active {
    @apply underline
}
</style>