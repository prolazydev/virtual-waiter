<template>
  <ul 
    :class="{ 'show-business-categories-input': shouldShowResults }" 
    class="business-categories-result"
  >
    <li 
      v-for="(item, index) in categoriesResult" 
      :key="index" 
      @click="$emit('addCategory', item.name)" 
      class="flex gap-1"
    >
      <p v-if="item.parentCategories[0]" class="capitalize">
        {{ item.parentCategories[0] }} - 
      </p> 
      <span v-html="formatText(item.name)"></span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { BusinessCategory } from '@/types/models/business';

const props = defineProps<{
  categoriesResult: BusinessCategory[];
  categoryInput: string;
  formatText: (name: string) => string;
}>();

defineEmits<{
  (e: 'addCategory', name: string): void;
}>();

// Only show results when we have both search input and results to show
const shouldShowResults = computed(() => {
  return props.categoriesResult.length > 0 && props.categoryInput.length > 0;
});
</script>

<style scoped>
.business-categories-result {
  @apply max-h-64 flex flex-col flex-nowrap gap-0 bg-white shadow-lg absolute transition-all duration-300
         top-[calc(100%-3rem)] left-0 opacity-0 pointer-events-none 
         overflow-hidden overflow-y-scroll z-[500];
  min-width: 200px;
}

.business-categories-result li {
  @apply p-2 cursor-pointer border-b-2  
         hover:border-b-rose-700
         transition-all duration-300;
}

.show-business-categories-input {
  @apply opacity-100 pointer-events-auto top-[calc(100%+0.75rem)];
}
</style>
