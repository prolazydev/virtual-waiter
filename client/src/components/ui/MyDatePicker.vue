<template>
	<DatePicker>
		<!-- @vue-expect-error stupid -->
		<template #default="{ inputValue, inputEvents }">
			<input :class="customStyle ? customStyle : 'w-64 px-2 py-1 border-2 border-[#1b1b1b]'" :value="inputValue" v-on="inputEvents" :placeholder="_placeholder ? _placeholder : new Date().toLocaleDateString()" />
		</template>
	</DatePicker>
</template>

<script lang="ts" setup>
import { DatePicker } from 'v-calendar';

defineProps<{
	togglePop?: boolean;
	customStyle?: string;
	_placeholder?: string;
}>();
</script>

<style>
.vc-popover-content {
	@apply border-2 border-[#1b1b1b] rounded-none;
}

.vc-popover-content button {
	@apply rounded-none;
}
</style>