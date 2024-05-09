<template>
	<Suspense>
		<template #default>
			<BusinessView  />
		</template>
		<template #fallback>
			<div class="loading-content">
				<LucideIcon name="ChefHat" class="text-gray-200 " :size="148" :stroke-width="2" />
			</div>
		</template>
	</Suspense>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>
