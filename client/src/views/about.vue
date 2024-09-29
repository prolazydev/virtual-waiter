<template>
    <div class="">
        About
    </div>
</template>

<script lang="ts" setup>
import { definePage } from 'unplugin-vue-router/runtime';

definePage({
    meta: {
        title: 'About',
        auth: 'both',
    },
    name: 'about',
});

await new Promise((resolve) => setTimeout(async () => {

	resolve('resolved');
}, 1000));
</script>

<style scoped>

</style>