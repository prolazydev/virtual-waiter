<template>
	<div class="dashboard-home">
		<div class="quick-data-graphs">
			<!-- TODO: Make the cards dynamic -->
			<div class="flex flex-col gap-5">
				<div class="flex flex-col gap-2">
					<h2 class="text-2xl font-semibold">Quick Graphs</h2>

					<div class="flex gap-5">
						<div class="quick-graph">
							<div class="flex flex-col gap-1">
								<Tooltip :text="'Total over 9000!'" _class="w-max mb-1 transition-all">
									<h2 class="">Weekly Income</h2>
								</Tooltip>
								<hr>
								<div class="flex gap-3 justify-between">
									<p>9000$</p>
									<LucideIcon name="TrendingUp" :size="24" class="stroke-emerald-600" :stroke-width="2" />
								</div>
							</div>
							<LucideIcon name="PiggyBank" :size="34" :stroke-width="1.5" />
						</div>
						<div class="quick-graph">
							<div class="flex flex-col gap-1">
								<h2>Weekly Clients</h2>
								<hr>
								<p>17 New Clients</p>
							</div>
							<LucideIcon name="UserRound" :size="34" :stroke-width="1.5" />
						</div>
						<div class="quick-graph">
							<div class="flex flex-col gap-1">
								<h2>Weekly Reservations</h2>
								<hr>
								<p>5 New Reservations</p>
							</div>
							<LucideIcon name="NotebookPen" :size="34" :stroke-width="1.5" />
						</div>
						<div class="quick-graph">
							<div class="overflow-hidden w-full max-w-full flex flex-col gap-1">
								<h2>Popular Dishes</h2>
								<hr>
								<div class="favorite-dish-slider">
									<!-- TODO: Have them be links of the dishes for the specific restaurant -->
									<p class="favorite-dish-slide">Spaghetti</p>
									<p class="favorite-dish-slide">Lasagna</p>
									<p class="favorite-dish-slide">Carbonara</p>
								</div>
							</div>
							<LucideIcon name="ChefHat" :size="34" :stroke-width="1.5" />
						</div>
					</div>
				</div>

				<!-- charts -->
				<!-- TODO: Table of Latest Orders, needs to show order Id, Client Name, Date, Status, Price and The Restaurant as link -->

				<div class="flex flex-col gap-2">
					<h2 class="text-2xl font-semibold">Latest Orders</h2>

					<table>
						<thead>
							<tr>
								<th>Order ID</th>
								<th>Client Name</th>
								<th>Date</th>
								<th>Status</th>
								<th>Price</th>
								<th>Restaurant</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>John Doe</td>
								<td>2021-09-01</td>
								<td>Delivered</td>
								<td>20$</td>
								<td><a href="#">Restaurant</a></td>
							</tr>
							<tr>
								<td>2</td>
								<td>Jane Doe</td>
								<td>2021-09-02</td>
								<td>Delivered</td>
								<td>25$</td>
								<td><a href="#">Restaurant</a></td>
							</tr>
							<tr>
								<td>3</td>
								<td>John Doe</td>
								<td>2021-09-03</td>
								<td>Delivered</td>
								<td>30$</td>
								<td><a href="#">Restaurant</a></td>
							</tr>
						</tbody>
					</table>
				</div>
			

			</div>
			
			<div class="favorite-restaurants">
				<h2 class="text-2xl font-semibold">Favorite Businesses</h2>

				<div class="flex gap-5">
					<BusinessCardItem v-for="business in favoriteBusinesses" :key="business._id" :business />
					<BusinessCardItem v-for="business in favoriteBusinesses" :key="business._id" :business />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { type Business } from '@/types/business';

const favoriteBusinesses = ref<Business[]>([]);

onMounted(() => {
	useScrollX('.favorite-dish-slider');
});

const getBusinesses = async () => {
	const { response, data } = await myFetch<Business[]>('business_self');
	if (response.value!.ok && data.value) 
		favoriteBusinesses.value = data.value;
}

await getBusinesses();


</script>

<style scoped>
.dashboard-home {
	@apply flex flex-col gap-5
}

.quick-data-graphs {
	@apply flex  justify-between 
}

.quick-graph {
	@apply 	h-fit py-2 px-3 flex gap-3 items-center
			border-2 border-[#1b1b1b]
}

.quick-graph hr {
	@apply border-[#1b1b1b]/50 
}

.quick-graph h2 {
	@apply text-lg font-semibold 
}

/* .quick-graph p {
	@apply leading-5
} */

.favorite-dish-slider {
	@apply flex gap-2 border-hidden overflow-x-scroll transition-transform duration-300
	;
	scroll-behavior: smooth;

	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
}

.favorite-dish-slider::-webkit-scrollbar {
	@apply  hidden 
}

.favorite-dish-slide {
	@apply 	px-[6px] py-[0.75px] bg-[#1b1b1b] text-white text-[0.9375rem] font-semibold rounded-full cursor-pointer 
			box-border select-none
			hover:bg-[#303030] hover:shadow-md transition-all
			;
}
 
.favorite-restaurants {
	@apply flex flex-col gap-2
}


</style>