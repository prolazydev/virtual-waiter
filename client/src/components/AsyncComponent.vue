<template>
	<component :is="componentId"></component>
</template>

<script lang="ts" setup>

defineProps<{
	componentId: string
}>();
</script>

<style scoped>

</style>