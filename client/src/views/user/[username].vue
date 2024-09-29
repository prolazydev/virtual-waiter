<template>
	<div class="flex">
		<pre>
			{{ userData }}
		</pre>
	</div>
</template>

<script lang="ts" setup>
import { definePage } from 'unplugin-vue-router/runtime';

definePage({
	meta: {
        auth: 'need-auth',
	},
    name: 'user-profile',
    props: {
        username: {
            type: String,
            required: true
        }
    },
});

// TODO: Handle autmatic prompting of specific action depending on the route query, eg: /user/:username?setting=primary-email

const userData = ref();

const { params } = useRoute('user-profile');

console.log(params);

// await new Promise((resolve) => setTimeout(async () => {
	const res = await myFetch(`user/${params.username}`, '', { method: 'GET' });

	userData.value = res.data;
// 	resolve('resolved');
// }, 1000));

</script>

<style scoped>

</style>