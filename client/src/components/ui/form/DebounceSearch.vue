<template>
	<div class="debounce-search-input">
		<label v-if="label" :for="id">{{ label }}</label>
		<input 
			v-model="model"
			@focus="$emit('focus', 'focus')"
			:class="inputClass"
			:id="id"
			:placeholder="placeholder"
			:disabled="disabled"
			autocomplete="off"
			:type="inputType"
		/>

		<slot name="bottom"></slot>
	</div>
</template>

<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from 'vue';

defineSlots<{
    bottom: void;
}>();

const { 
	debounceDelay = 500, 
} = defineProps<{
	label?: string,
	id: string,
	inputClass?: string,
	placeholder?: string,
	disabled?: boolean,

	debounceDelay?: number,

	inputValue?: string,
	inputType: InputTypeHTMLAttribute
}>();

const model = defineModel()

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
	(e: 'debounceFn', value: string): Function
	(e: 'focus', value: string): void
}>();

watchDebounced(() => model.value, (val) => {
	emit('debounceFn', val as string)
}, { debounce: debounceDelay });
</script>

<style>
.debounce-search-input {
	@apply relative flex flex-col gap-2
	;
}
</style>