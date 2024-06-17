<template>
	<div class="flex">
		<pre>
			{{ userData }}
		</pre>
	</div>
</template>

<script lang="ts" setup>
const userData = ref()

const { params } = useRoute('/user/[username]');

console.log(params);

// await new Promise((resolve) => setTimeout(async () => {
	const res = await myFetch(`user/${params.username}`, '', { method: 'GET' });

	userData.value = res.data;
	// resolve('resolved');
// }, 1000));


definePage({
	meta: {
		auth: true
	}
})
</script>

<style scoped>

</style>