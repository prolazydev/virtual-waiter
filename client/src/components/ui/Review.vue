<template>
	<div class="relative flex gap-1 items-end text-sm">
		<ul class="flex absolute">
			<li v-for="item in Math.floor(props.stars)" :key="item">
				<LucideIcon name="Star" :size="sizes" fill="inherit" />
			</li>
			<li v-if="hasFloatingPointAboveHalf">
				<LucideIcon name="StarHalf" :size="sizes" fill="inherit" />
			</li> 
		</ul>
		<ul class="flex">
			<LucideIcon name="Star" :size="sizes" color="gray" />
			<LucideIcon name="Star" :size="sizes" color="gray" />
			<LucideIcon name="Star" :size="sizes" color="gray" />
			<LucideIcon name="Star" :size="sizes" color="gray" />
			<LucideIcon name="Star" :size="sizes" color="gray" />
		</ul>
		<p v-if="reviews" :class="_pClass ?? 'text-sm'">
			({{ `${reviews} Reviews` }})
		</p>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	stars: number,
	reviews?: number,
	sizes?: number,
	_pClass?: string,
}>();

const hasFloatingPointAboveHalf = computed(() => props.stars % 1 >= 0.5);
</script>
