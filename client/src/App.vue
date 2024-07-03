<template>
	<ProgressBar />
	<Header />
	<div class="header-separator"></div>
	<div id="tostBox"></div>

	<RouterView v-slot="{ Component }">
		<template v-if="Component">
			<Transition mode="out-in">
				<Suspense :timeout="0" >
					<template #default>
						<component :is="Component"></component>
					</template>

					<template #fallback>
						<Loading />
					</template>
				</Suspense>
			</Transition>
		</template>
	</RouterView>

	<!-- NOTE: Needs to teleport to place it below the component since it doesn't with transition/suspense -->
	<Teleport to="body">
		<Footer />
	</Teleport>
</template>

<script setup lang="ts">
import Loading from '@/components/ui/Loading.vue';

const { checkAuth } = useAuth();

onBeforeMount(async () => {
	await checkAuth();
});

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
