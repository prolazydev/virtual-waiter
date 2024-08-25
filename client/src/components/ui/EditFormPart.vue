<template>
    <div class="flex flex-col" :title="title">
        <label 
            @click="emit('toggleEdit')" 
            :for="id"
            class="form-part-label" 
        >
            {{ title }}
            <LucideIcon 
                :class="{ 'form-part-edit-icon-toggle': state === 'edit' }"
                class="form-part-edit-icon"
                name="PencilLine" 
                size="24"
            />
        </label>
        
        <slot></slot>

        <div class="min-h-14 relative transition-all">
            <div class="w-full h-[1px] bg-black absolute transition-all ease" :class="{ 'top-full': state === 'edit', 'top-10': state === 'idle' }"></div>
            <Transition name="fade">
                <slot v-if="state === 'edit'" name="footer"></slot>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { LoadingState } from '@/types';

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