<template>
	<DatePicker>
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