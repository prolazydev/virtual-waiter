<template>
  <ul 
    :class="{ 'show-search-results': hasResults }" 
    class="search-result" 
  >
    <li v-for="item in searchResults.features" :key="item.properties.osm_id">
      <div 
        @click="$emit('selectLocation', item)"
        role="button" 
        class="capitalize"
      > 
        <b>{{ `${item.properties.city}: ${item.properties.name}` }}</b>
        {{ item.properties.country ? ` - ${item.properties.country ?? '' }` : '' }}
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { BusinessLocationData, BusinessFormFields } from '@/types/models/business';

const props = defineProps<{
  searchResults: BusinessLocationData;
  businessFormFields: BusinessFormFields;
}>();

defineEmits<{
  (e: 'selectLocation', location: BusinessLocationData['features'][0]): void;
}>();

const hasResults = computed(() => {
  return props.searchResults && 
         props.searchResults.features && 
         props.searchResults.features.length > 0 &&
         props.businessFormFields.location.state !== 'idle';
});
</script>

<style scoped>
.search-result {
  @apply w-52 max-h-80 flex flex-col flex-nowrap gap-0 bg-white shadow-lg absolute transition-all duration-300
         top-[calc(100%-3rem)] left-0 opacity-0 pointer-events-none 
         overflow-hidden overflow-y-scroll z-[500];
}

.search-result li {
  @apply p-2 cursor-pointer border-b-2  
         hover:border-b-rose-700
         transition-all duration-300;
}

.show-search-results {
  @apply opacity-100 pointer-events-auto top-[calc(100%+0.75rem)];
}
</style>
