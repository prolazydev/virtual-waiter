<template>
<div id="progressBar" class="progress-bar">
	<div class="progress-bar-fill"></div>
</div>
</template>

<script lang="ts" setup>

</script>

<style>
.progress-bar {
	@apply z-[100000] transition-all ease-in-out 
	;
	position: fixed;
	top: 0;
	left: 0;
	width: 0%;
	height: 4px;
	background-color: #f3f3f3;

	touch-action: none;
	pointer-events: none;
}

.in-progress {
	@apply opacity-100
	;
}

.finished-progress {
	@apply opacity-0 duration-1000
	;
}

.progress-bar-fill {
	@apply h-full bg-rose-600 transition-all ease-in-out
	;
}
</style>