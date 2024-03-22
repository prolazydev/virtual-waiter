<template>
    <component
        :is="icon"
        :size="size || 32" 
        :color="color"
        :stroke-width="strokeWidth" 
    />
</template>

<script lang="ts" setup>
import type { IconKeys } from "@/types";
import * as icons from "lucide-vue-next";

const props = defineProps({
	name: {
		type: String as PropType<IconKeys>,
		required: true
	},
	/**
	 * Size of the icon in pixels. Defaults to 32.
	 */
	size: Number, 
	color: String,
	strokeWidth: Number,
})

const icon = computed(() => (icons as any)[props.name]);
</script>

<style scoped>

</style>