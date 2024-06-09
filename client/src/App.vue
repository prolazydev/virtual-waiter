<template>
	<ProgressBar />
	<Header />
	<div class="header-separator"></div>
	<div id="tostBox"></div>
	<Router-view />
	<Footer />
</template>

<script setup lang="ts">
const { checkAuth } = useAuth();
onBeforeMount(async () => {
	await checkAuth();
})

onMounted(async () => {
	// const { runSocket } = webSocketService();
	// runSocket();

})
</script>

<style scoped>
.header-separator {
	@apply h-[87px]
	;
}
</style>

