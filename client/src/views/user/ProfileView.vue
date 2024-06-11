<template>
	<div class="flex">
		<pre>
			{{ userData }}
		</pre>
	</div>
</template>

<script lang="ts" setup>
const userData = ref()

// await new Promise((resolve) => setTimeout(async () => {
	const res = await myFetch('user/me', '', { method: 'GET' });

	userData.value = res.data;
	// resolve('resolved');
// }, 1000));

</script>

<style scoped>

</style>