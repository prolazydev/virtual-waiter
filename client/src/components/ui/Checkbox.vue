<template>
	<label :for="props.id" class="container">
		{{ props.label }}
		<input :id="props.id" type="checkbox">
		<span class="checkmark"></span>
	</label>
</template>

<script lang="ts" setup>
const props = defineProps<{
	label: string,
	id: string,

}>();
</script>

<style scoped>
/* Customize the label (the container) */
.container {
	@apply relative text-base pl-5 cursor-pointer
	;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
	@apply h-0 w-0 absolute opacity-0 cursor-pointer
}

/* Create a custom checkbox */
.checkmark {
	@apply h-4 w-4 border border-[#1b1b1b] bg-white absolute top-1/2 -translate-y-1/2 left-0
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  	background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
	/* TODO: Maybe add bg color */
  /* background-color: #2196F3; */
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
	@apply content-[''] absolute hidden
	;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  	display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
	@apply  left-[4px] top-0 w-[0.4rem] h-[0.75rem] border-solid border-0 border-r-[3px] border-b-[3px] border-[#1b1b1b]
	;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}


</style>