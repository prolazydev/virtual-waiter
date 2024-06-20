<template>
	<div class="flex flex-col">
		<!-- NODE: Default custom slot -->
		<slot></slot>

		<dialog class="my-dialog " :class="_class" :style="boxSize">
			<div class="dialog-head">
				<slot name="header">
					<div class="flex gap-5 justify-between items-center">
						<h1 class="text-2xl font-semibold text-nowrap">{{ title }}</h1>
						<LucideIcon 
							@click="toggleDialog(_class && !toggleClass ? `.${props._class.split(' ')[0]}` : toggleClass)" 
							class="cursor-pointer" 
							name="X" 
							:size="38" 
						/>
					</div>
					<hr class="border-[#1b1b1b]">
				</slot>
			</div>
			<div class="dialog-body">
				<slot name="body"></slot>
			</div>

			<div class="dialog-footer">
				<slot name="footer"></slot>
			</div>
		</dialog>
	</div>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue';
import { sizes } from '@/components/ui/Dialog/utils';

const { toggleDialog } = myDialog();

const props = withDefaults(defineProps<{
	toggleClass?: string;
	_class?: string;
	title?: string,
	size?: 'sm' | 'md' | 'lg' | 'full' | 'custom';
}>(), {
	toggleClass: '',
	_class: '',
	title: 'Dialog',
	size: 'lg'
})

const boxSize: StyleValue = {
	width: sizes[props.size].width,
	height: sizes[props.size].height
}
</script>

<style>
/*   Closed state of the dialog   */
.my-dialog {
	@apply 	border-4 border-[#1b1b1b] shadow-lg
			opacity-0 
			;

	transition:	
		opacity 0.3s ease,
		overlay 0.3s ease allow-discrete,
		display 0.3s ease allow-discrete;
}
/*   Open state of the dialog  */
.my-dialog[open] {
	@apply 	opacity-100
			;
}

/*   Before-open state  */
/* Needs to be after the previous .my-dialog[open] rule to take effect,
    as the specificity is the same */
@starting-style {
	.my-dialog[open] {
		opacity: 0;
	}
}

/* Transition the :backdrop when the dialog modal is promoted to the top layer */
.my-dialog::backdrop {
	background-color: rgb(0 0 0 / 0%);
	transition:
		display 0.3s allow-discrete,
		overlay 0.3s allow-discrete,
		background-color 0.3s;
}
.my-dialog[open]::backdrop {
	background-color: rgb(0 0 0 / 25%);
}

/* This starting-style rule cannot be nested inside the above selector
because the nesting selector cannot represent pseudo-elements. */
@starting-style {
	.my-dialog[open]::backdrop {
		background-color: rgb(0 0 0 / 0%);
	}
}

/* =========================================================================== */

.dialog-head {
	@apply flex flex-col gap-5
}

.dialog-body {
	@apply w-full h-full flex overflow-y-hidden 
}

.dialog-footer {
	@apply flex mt-auto min-h-11
}
</style>