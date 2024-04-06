<template>
	<label :for="props._id" class="checkbox-container">
		{{ props._label }}
		<input 	@change="$emit('update:modelValue', returnValue($event.target as HTMLInputElement))"  
				:checked="modelValue" :disabled="(disabled as boolean)"
				:id="props._id" :class="_class" type="checkbox"
				>
		<span class="checkbox-label"></span>
		<span class="checkbox-indeterminate-label"></span>
	</label>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
	(e: 'indeterminate', value: string, checked: boolean): void,
	(e: 'update:modelValue', value: boolean): void
}>();

const props = defineProps<{
	_label: string,
	_id: string,
	_class?: string,
	modelValue?: boolean, 
	disabled?: Boolean | String
	indeterminate?: boolean
}>();

const returnValue = (e: HTMLInputElement) => {
	if (props.indeterminate) {
		if (e.readOnly) {
			e.checked = e.readOnly = false;

			emit('indeterminate', '', e.readOnly)
		}
		else if (!e.checked) {
			e.readOnly = e.indeterminate = true;

			emit('indeterminate', 'indeterminate', e.checked)
		} else
			emit('indeterminate', '', e.checked)
	}
	
	return e.checked
}

</script>

<style>
/* Customize the label (the container) */
.checkbox-container {
	@apply relative text-base cursor-pointer
	;
	padding-left: 1.25rem;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
	@apply h-0 w-0 absolute opacity-0 cursor-pointer
}

/* Create a custom checkbox */
.checkbox-label {
	@apply h-4 w-4 border border-[#1b1b1b] bg-white absolute top-1/2 -translate-y-1/2 left-0
}

/* On mouse-over, add a grey background color */
.checkbox-container:hover input ~ .checkbox-label {
  	background-color: #ccc;
}

.checkbox-container input:focus ~ .checkbox-label {
	@apply border-[#1b1b1b]
	;
	background-color: #ccc;
}

.checkbox-container input:disabled ~ .checkbox-label {
	@apply bg-[#1b1b1b] border-[#1b1b1b] cursor-not-allowed
	;
}


/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked ~ .checkbox-label {
	/* TODO: Maybe add bg color */
  /* background-color: #2196F3; */
}

/* Create the checkmark/indicator (hidden when not checked) */
/* Style the checkmark/indicator */
.checkbox-label:after {
	@apply 	w-[0.4rem] h-[0.75rem] left-[4px] top-0 border-solid border-0 border-r-[3px] border-b-[3px] border-[#1b1b1b]
	
			content-[''] absolute hidden
	;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}

/* Show the checkmark when checked */
.checkbox-container input:checked ~ .checkbox-label:after {
  	display: block;
}

.checkbox-container input:indeterminate ~ .checkbox-indeterminate-label:after {
	@apply content-[''] absolute block
	;
}

.checkbox-indeterminate-label:after {
	@apply w-2 h-0.5 bg-[#1b1b1b] absolute left-[4px] top-1/2 -translate-y-1/2 
}

</style>
