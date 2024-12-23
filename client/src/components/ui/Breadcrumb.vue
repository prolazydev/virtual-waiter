<template>
	<nav class="breadcrumb">
		<ul>
			<li v-for="(node, index) in breadcrumbTitles" :key=" index ">
				<router-link v-if="node?.link" :to=" { name: node.link } "
					class="border-b-2 border-b-transparent transition-colors hover:border-b-[#1b1b1b] active:border-b-rose-600">
					{{ node.title }}
				</router-link>
				<span v-else>
					{{ node.title }}
				</span>
				<template v-if="breadcrumbTitles.length > 1 && index !== breadcrumbTitles.length - 1">
					<span :class=" { 'last-breadcrumb': breadcrumbTitles.length - 2 === index } ">
						/
					</span>
				</template>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
import type { Breadcrumb, BreadcrumbNode } from '@/types/common';

const props = defineProps<{
	node?: BreadcrumbNode;
}>();

const breadcrumbTitles = computed(() => traverseNodes(props.node));

function traverseNodes(node?: BreadcrumbNode): BreadcrumbNode[] {
	const result: Breadcrumb[] = [];
	let currentNode: BreadcrumbNode | undefined = node;
	if (!currentNode)
		return [];
	while (currentNode) {
		result.push({
			title: currentNode.title,
			link: currentNode.link,
		});
		currentNode = currentNode.node;
	}
	return result;
}

</script>

<style scoped>
.breadcrumb {
	@apply text-lg;
	display: flex;
	align-items: center;
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
	@apply font-bold;
}
</style>