
<template>
	<div class="dashboard">
		<Suspense>
			<template #default>
				<BusinessDashboard />
			</template>
			<template #fallback>
				<div class="loading-content">
					<LucideIcon name="ChefHat" class="text-gray-200 " :size="148" :stroke-width="2" />
				</div>
			</template>
		</Suspense>
	</div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.dashboard {
	@apply py-8 flex flex-col gap-20
}

</style>