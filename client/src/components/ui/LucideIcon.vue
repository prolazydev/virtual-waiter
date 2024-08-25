<template>
    <component
        :is="icon"
        :size="(size as number)" 
        :color="(color as string)"
        :stroke-width="strokeWidth"
    >
		<slot></slot>
	</component>
</template>

<script lang="ts" setup>
import type { IconKeys } from "@/types";
import * as icons from "lucide-vue-next";

const props = withDefaults(defineProps<{
	name: IconKeys,
    /** Defaults to 32 */
	size?: number | string | undefined,
	color?: number | string | undefined,
	strokeWidth?: number | string,
}>(), {
	size: 32,
	strokeWidth: 1
});

const icon = computed(() => icons[props.name]);
</script>
