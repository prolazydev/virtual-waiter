<template>
	<div class="flex flex-col">
		<!-- NOTE: Default custom slot -->
		<slot></slot>

		<dialog class="my-dialog" :class="_class" :style="boxSize">
			<div class="h-full flex flex-col">
                <div class="dialog-head">
                    <div class="flex gap-5 justify-between items-center">
                        <slot name="header">
                            <h1 class="dialog-title">{{ title }}</h1>
                        </slot>
                        
                        <LucideIcon 
                            @click="handleToggleDialog" 
                            class="hover-red-button" 
                            name="X" 
                            :size="38" 
                            stroke-width="2"
                        />
                    </div>
                    <hr class="border-[#1b1b1b]">
                </div>
                <div class="dialog-body">
                    <slot name="body"></slot>
                </div>

                <div class="dialog-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
		</dialog>
	</div>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue';
import { sizes } from '@/components/ui/Dialog/utils';

const { toggleDialog } = myDialog();

defineSlots<{
    default: void;
    header: void;
    /**
     * test
     */
    body: void;
    footer: void;
}>();

const emit = defineEmits<{
    toggleDialog: [];
}>();

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
});

const boxSize = computed<StyleValue>(() => {
    return {
        width: sizes[props.size].width,
        height: sizes[props.size].height,
    }
});

const handleToggleDialog = () => {
    toggleDialog(
        (props._class && !props.toggleClass) 
        ? `.${props._class.split(' ')[0]}` 
        : props.toggleClass,
        () => emit('toggleDialog'),
        () => emit('toggleDialog')
    )
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

.dialog-title {
    @apply text-2xl font-semibold text-nowrap
}

/*   Before-open state  */
/* Needs to be after the previous .my-dialog[open] rule to take effect,
    as the specificity is the same */
@starting-style {
	.my-dialog[open] {
        @apply opacity-0
        ;
		/* opacity: 0; */
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
	@apply w-full flex  
}

.dialog-footer {
	@apply flex mt-auto min-h-11
}
</style>