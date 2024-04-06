
<template>
	<div class="dashboard">
		<Suspense>
			<template #default>
				<BusinessDashboard />
			</template>
			<template #fallback>
				<!-- <div class="dashboard"> -->
					<div class="loading-dashboard">
						<LucideIcon name="ChefHat" class="text-gray-200 " :size="148" :stroke-width="2" />
					</div>
				<!-- </div> -->
			</template>
		</Suspense>
	</div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.dashboard {
	@apply mt-auto py-16 px-20 flex flex-col gap-20
}

.loading-dashboard {
	margin: auto;
	transform: scale(0.75);
	opacity: 0;
	
	animation: loading-dashboard-animation 10s linear 0s 1 forwards;
}

@keyframes loading-dashboard-animation {
	15% {
		opacity: 1;
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}

</style>