<template>
	<div class="flex">
		<pre>
			{{ userData }}
		</pre>
	</div>
</template>

<script lang="ts" setup>

const userData = ref()
onMounted(async () => {
	const res = await myFetch('user/me', '', { method: 'GET' });

	userData.value = res.data;	
	console.log(res);
})
</script>

<style scoped>

</style>