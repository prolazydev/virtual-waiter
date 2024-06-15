<template>
	<div class="loading-content m-auto">
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

</script>

<style scoped>
.loading-content > svg {
	filter: url(#myfilters);
}
</style>