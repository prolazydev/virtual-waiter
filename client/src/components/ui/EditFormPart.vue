<template>
    <div class="flex flex-col" :title="`Toggle edit for ${title}`">
		<label 
			@click="emit('toggleEdit')" 
			:for="id"
			class="form-part-label" 
		>
			{{ title }}
			<Tooltip 
				:text="`Toggle edit for ${title}`" 
				:show="true" 
				:delay="1000"
				_class="mb-3"
			>
				<button type="button">
					<LucideIcon 
						:class="{ 'form-part-edit-icon-toggle': state === 'edit' }"
						class="form-part-edit-icon"
						name="PencilLine" 
						size="24"
					/>
				</button>
			</Tooltip>
		</label>
        
        <slot></slot>

        <div class="min-h-14 relative transition-all">
            <div 
				:class="{ 'top-full': state === 'edit', 'top-10 delay-150': state === 'idle' }"
				class="w-full h-[1px] bg-black absolute transition-all ease " 
			></div>
            <Transition name="fade">
                <slot v-if="state === 'edit'" name="footer"></slot>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { LoadingState } from '@/types';

defineSlots<{
    default: void;
    footer: void;
}>();


defineProps<{
    id: string;
    title?: string;
    state: LoadingState | 'edit';
}>();

const emit = defineEmits<{
    toggleEdit: [];
}>();
</script>

<style scoped>
.form-part-label {
    @apply w-full pb-1 flex justify-between cursor-pointer capitalize text-nowrap
}

.form-part-label:hover > .form-part-edit-icon {
    @apply stroke-2
}
.form-part-edit-icon {
    @apply  stroke-1 transition-all
            hover:stroke-2
    ;
}

.form-part-edit-icon-toggle {
    @apply stroke-2
}
</style>