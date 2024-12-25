<template>
	<div class="loading-content" :style="style">
		<LucideIcon name="ChefHat" class="text-gray-200 " :size="148" :stroke-width="2">
			<filter id='myfilters'>
				<!-- Shadow blur -->
				<feGaussianBlur
					stdDeviation='2'
					result='offset-blur'
				/>
				<!-- Invert drop shadow to make an inset shadow-->
				<feComposite
					operator='out'
					in='SourceGraphic'
					in2='offset-blur'
					result='inverse'
				/>
				<!-- Cut colour inside shadow -->
				<feFlood
					flood-color='black'
					flood-opacity='.85'
					result='color'
				/>
				<feComposite
					operator='in'
					in='color'
					in2='inverse'
					result='shadow'
				/>
				<!-- Placing shadow over element -->
				<feComposite
					operator='over'
					in='shadow'
					in2='SourceGraphic'
				/> 
			</filter>
		</LucideIcon>
	</div>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue';

defineProps<{
	style?: StyleValue
}>()
</script>

<style scoped>
.loading-content {
	@apply w-[inherit] flex flex-col items-center justify-center
	;
	/* height: calc(100vh - 400px); */
}

.loading-content > svg {
	@apply m-auto
	;
	filter: url(#myfilters);
}
</style>