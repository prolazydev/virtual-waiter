<template>
    <!-- TODO: Implement this -->
    <Suspense :timeout="0">
        <template #default>
            <slot></slot>
            <!-- <component :is="componentLoader" /> -->
        </template>
        <template #fallback>
            <Loading />
        </template>
    </Suspense>
</template>

<script lang="ts" setup>
import type { Component } from 'vue';

// defineProps<{
//     componentLoader: Component;
// }>()

</script>

<style scoped>

</style>