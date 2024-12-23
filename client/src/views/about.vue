<template>
    <div class="about-main">
        About
    </div>
</template>

<script lang="ts" setup>
await new Promise((resolve) => setTimeout(async () => {
	resolve('resolved');
}, 1000));
</script>

<style scoped>
.about-main {
	height: calc(100vh - 328px);
}
</style>