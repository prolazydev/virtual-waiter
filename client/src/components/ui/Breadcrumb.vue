<template>
  <nav class="breadcrumb">
    <ul>
      <li v-for="(title, index) in breadcrumbTitles" :key="index">
          {{ title }}
          <template v-if="breadcrumbTitles.length > 1 && index !== breadcrumbTitles.length - 1">
            <span
              :class="{ 'last-breadcrumb': breadcrumbTitles.length - 2 === index }"
            >
              /
            </span>
          </template>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
type BreadcrumbNode = {
  title: string;
  node?: BreadcrumbNode;
};

const props = defineProps<{
  node?: BreadcrumbNode;
}>();

const breadcrumbTitles = traverseNodes(props.node) as string[];

function traverseNodes(node?: BreadcrumbNode): string[] {
  const result: string[] = [];
  let currentNode: BreadcrumbNode | undefined = node;
  if (!currentNode) 
    return [];
  while (currentNode) {
    result.push(currentNode.title);
    currentNode = currentNode.node;
  }
  return result;
}

</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.breadcrumb ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb li {
  margin-right: 5px;
}

.last-breadcrumb {
  font-weight: 900;
  font-size: 24px;
}

</style>