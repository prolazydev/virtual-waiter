<template>
	<div 
		@pointerdown="startDragging" 
		@pointermove="dragging"
		@pointerup="stopDragging" 
		@pointerleave="stopDragging"
		ref="scrollContainer" 
		class="scroll-container" 
	>
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
	walkMultiplier?: number;
}>(), {
	walkMultiplier: 1.5,
});

const scrollContainer = ref<HTMLElement | null>(null);
let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let lastX = 0;
let velocity = 0;
let animationFrame: number | null = null;

const calculateVelocity = (currentX: number) => {
	velocity = currentX - lastX; // Calculate velocity based on position change
	lastX = currentX;
};

const applyMomentum = () => {
	if (!scrollContainer.value) return;

	if (Math.abs(velocity) > 0.5) { // Continue momentum if velocity is significant
		scrollContainer.value.scrollLeft -= velocity;
		velocity *= 0.980; // Gradually decrease velocity for a smooth stop
		animationFrame = requestAnimationFrame(applyMomentum);
	} else {
		velocity = 0;
		cancelAnimationFrame(animationFrame!);
		animationFrame = null;
	}
};

const startDragging = (event: PointerEvent) => {
	if (!scrollContainer.value) return;

	isDragging = true;
	scrollContainer.value.classList.add('dragging');
	startX = event.clientX || event.pageX;
	scrollLeft = scrollContainer.value.scrollLeft;
	lastX = startX; // Initialize lastX for velocity calculation

	if (animationFrame) 
		cancelAnimationFrame(animationFrame); // Stop existing momentum on new drag
};

const dragging = (event: PointerEvent) => {
	if (!isDragging || !scrollContainer.value) return;

	event.preventDefault();
	const x = event.clientX || event.pageX;
	const walk = (x - startX) * props.walkMultiplier; // Use prop multiplier
	scrollContainer.value.scrollLeft = scrollLeft - walk;

	calculateVelocity(x); // Update velocity
};

const stopDragging = () => {
	if (!scrollContainer.value) return;

	isDragging = false;
	scrollContainer.value.classList.remove('dragging');

	applyMomentum(); // Start applying momentum when dragging stops
};

</script>

<style>
.scroll-container {
	overflow-x: auto;
	display: flex;
	white-space: nowrap;
	cursor: grab;
	user-select: none;
	/* Prevents text selection during drag */

	/* Hide scrollbar */
	scrollbar-width: none; /* Firefox */
  	-ms-overflow-style: none; /* IE and Edge */
}

.scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.scroll-container.dragging {
	cursor: grabbing;
}
</style>