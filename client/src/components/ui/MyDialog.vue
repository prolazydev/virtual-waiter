<template>
	<dialog class="my-dialog gap-5" :class="_class">
		<div class="dialog-head">
			<slot name="head">
				<LucideIcon @click="toggleDialog" class="cursor-pointer" name="X" :size="48" />
			</slot>
		</div>
		<div class="dialog-body">
			<slot name="body"></slot>
		</div>

		<div class="dialog-footer">
			<slot name="footer"></slot>
		</div>
	</dialog>
</template>

<script lang="ts" setup>
defineProps<{
	_class?: string;
}>();

const toggleDialog = () => {
	const el = document.querySelector('.my-dialog') as HTMLDialogElement;

	// check if it has the "open" attribute
	if (el.hasAttribute('open')) {
		el.close();

		el.classList.remove('w-[50%] h-[50%] flex flex-col relative');
	}
	else {
		el.showModal();
		el.classList.add('w-[50%] h-[50%] flex flex-col relative');
	}
};
</script>

<style>
.my-dialog {
	@apply p-4 border-4 border-[#1b1b1b] shadow-lg
}

.my-dialog[open] {
	@apply 	w-[64rem] h-[42rem] flex flex-col
}

.dialog-head {
	@apply flex justify-end
}

.dialog-body {
	@apply w-full h-full flex overflow-y-hidden 
}

.dialog-footer {
	@apply flex mt-auto min-h-11
}

</style>