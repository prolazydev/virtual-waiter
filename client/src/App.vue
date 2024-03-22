<template>
	<Header />
	<div class="header-separator"></div>
	<div id="tostBox"></div>
	<RouterView />
	<Footer />
</template>

<script setup lang="ts">
// import { runSocket } from './services/webSocket';


onMounted(async () => {
	// const call = await fetch('http://localhost:3000');

	// const contentType = call.headers.get('content-type')!;
	// if ( contentType.includes('text'))
	// 	console.log(await call.text());

	// runSocket();
})

</script>

<style scoped>
.header-separator {
	@apply h-[87px]
	;
}
</style>

