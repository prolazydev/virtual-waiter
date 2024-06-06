<template>
	<div class="w-full flex flex-col gap-5">
		<div class="graph-group-1">
			<!-- TODO: Make the cards dynamic -->
			<div class="w-[-webkit-fill-available] flex flex-col gap-5">
				<div class="quick-data-graphs">
					<h2 class="text-2xl font-semibold">Quick Graphs</h2>

					<div class="flex justify-between">
						<div class="quick-graph">
							<div class="flex flex-col gap-1">
								<Tooltip :text="'Total over 9000!'" _class="w-max mb-1 transition-all">
									<h3>Weekly Income</h3>
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
								<h3>Weekly Clients</h3>
								<hr>
								<p>17 Clients</p>
							</div>
							<LucideIcon name="UserRound" :size="34" :stroke-width="1.5" />
						</div>
						<div class="quick-graph">
							<div class="flex flex-col gap-1">
								<h3>Weekly Reservations</h3>
								<hr>
								<p>5 Reservations</p>
							</div>
							<LucideIcon name="NotebookPen" :size="34" :stroke-width="1.5" />
						</div>
						<div class="quick-graph">
							<div class="overflow-hidden w-full max-w-full flex flex-col gap-1">
								<h3>Popular Dishes</h3>
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
				<!-- TODO: 	Table of Latest Orders, needs to show order Id, Client Name, Date, Status, Price and The Restaurant as link
							Up to 5 latest orders, with a button to view all orders
				-->
				<div class="flex flex-col gap-2">
					<div class="flex justify-between items-baseline">
						<h2 class="text-2xl font-semibold">Latest Orders</h2>
						<a href="#" class="text-[#1b1b1b] font-semibold border-b border-b-transparent hover:border-b-gray-400 ">View All</a>
					</div>

					<div class="latest-orders-table-container">
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
								<tr v-for="item in 5" :key="item">
									<!-- TODO: make it be a router-link -->
									<td><a href="#">{{ item }}</a></td>
									<td>John Doe</td>
									<td>2021-09-0{{ item }}</td>
									<!-- TODO: style based on the status -->
									<td>Delivered</td>
									<td>{{ 20 * item }}$</td>
									<td><a href="#">Business</a></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			</div>
			
			<div v-if="favoriteBusinesses.length > 0" class="favorite-restaurants">
				<!-- TODO: Switch between Business and Businesses if it's more than 1 and also switch to: "Add a favorite" placeholder if there are none -->
				<h2 class="text-2xl font-semibold">Favorite Businesses</h2>

				<div class="glider-container relative w-[316px] max-h-[872px] overflow-hidden">
					<div data-glide-el="track">
						<ul class="favorite-restaurant-slides">
							<li v-for="business in favoriteBusinesses" :key="business._id">
								<BusinessCardItem :business="business" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="graph-group-2">
			<div class="flex gap-5">
				<div class="flex flex-col gap-2">
					<div class="w-[21.75rem] h-[18.5rem] py-2 px-3 flex flex-col gap-2 border-2 border-[#1b1b1b]">
						<h2 class="text-2xl font-semibold">Inquiry Breakdown</h2>
						<hr>
						
						<canvas class="inquiry-breakdown-chart w-full h-full"></canvas>
					</div>
					
					<div class="w-[21.75rem] h-[18.5rem] py-2 px-3 flex flex-col gap-2 border-2 border-[#1b1b1b]">
						<h2 class="text-2xl font-semibold">Income Per Quarter</h2>
						<hr>
						
						<canvas class="income-per-quarter-chart"></canvas>
					</div>
				</div>
				
				<div class="w-full flex gap-x-5 gap-y-2 flex-wrap">
					<div class="w-full flex gap-x-5">
						<div class="w-full h-fit py-2 px-3 flex flex-col gap-2 border-2 border-[#1b1b1b]">
							<h2 class="text-2xl font-semibold">Monthly Inquiries</h2>
							<hr>
							
							<canvas class="inquiries-per-month-chart"></canvas>
						</div>

						<div gap-x-5 class="w-full h-fit py-2 px-3 flex flex-col gap-2 border-2 border-[#1b1b1b]">
							<h2 class="text-2xl font-semibold">Inquiry Response Time</h2>
							<hr>
							
							<canvas class="inquiriy-response-time-month-chart"></canvas>
						</div>
					</div>

					<div class="w-full flex gap-x-5 justify-between">
						<div class="w-1/2 h-fit py-2 px-3 flex flex-col gap-2 border-2 border-[#1b1b1b]">
							<h2 class="text-2xl font-semibold">Income Per Month</h2>
							<hr>
							
							<canvas class="income-per-month-chart"></canvas>
						</div>

						<div class="w-1/2 h-fit py-2 px-3 flex flex-col gap-2 border-2 border-[#1b1b1b]">
							<h2 class="text-2xl font-semibold">*</h2>
							<hr>
							
							<canvas class="income-per-month-chart"></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { type Business } from '@/types/business';
import myBusinessDashboardGraph from '@/utils/businessDashboard/myBusinessDashboardGraph';
import Glide from '@glidejs/glide';

import Chart from 'chart.js/auto';

const favoriteBusinesses = ref<Business[]>([]);

let glide: Glide;

// Charts
let inquiriesChart: Chart<"doughnut", number[], string>;
let inquiriesPerMonthChart: Chart<"bar", number[], string>;
let inquiriyResponseTimeChart: Chart<"line", number[], string>;

let incomePerQuarterChart: Chart<"doughnut", number[], string>;
let incomePerMonthChart: Chart<"bar", number[], string>;

onMounted(() => {
	useScrollX('.favorite-dish-slider');

	if (favoriteBusinesses.value.length > 1) {
		glide = new Glide('.glider-container', {
			type: 'carousel',
			perView: 1,
			gap: 20,

			autoplay: false,
			hoverpause: true,

			breakpoints: {
				1024: {
					perView: 2,
					gap: 0,
				}
			}
		}).mount();
	}

	const { 
		myInquiriesChart,
		myInquiriesPerMonthChart,
		myInquiriyResponseTimeChart,
		myIncomePerQuarterChart,
		myIncomePerMonthChart,
	 } = myBusinessDashboardGraph(inquiriesChart, inquiriesPerMonthChart, inquiriyResponseTimeChart, incomePerQuarterChart, incomePerMonthChart)

	inquiriesChart = myInquiriesChart;
	inquiriesPerMonthChart = myInquiriesPerMonthChart;
	inquiriyResponseTimeChart = myInquiriyResponseTimeChart;
	incomePerQuarterChart = myIncomePerQuarterChart;
	incomePerMonthChart = myIncomePerMonthChart;
});

onUnmounted(() => {
	if (glide) glide.destroy();

	if (inquiriesChart) inquiriesChart.destroy();
	if (inquiriesPerMonthChart) inquiriesPerMonthChart.destroy();
	if (inquiriyResponseTimeChart) inquiriyResponseTimeChart.destroy();

	if (incomePerQuarterChart) incomePerQuarterChart.destroy();
	if (incomePerMonthChart) incomePerMonthChart.destroy();
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
	@apply flex gap-5 justify-between
}

.graph-group-1 {
	@apply w-full flex gap-5 justify-between
}

hr {
	@apply border-[#1b1b1b]/50 
}

.quick-data-graphs {
	@apply flex flex-col gap-2
}

.quick-graph {
	@apply 	h-fit py-2 px-3 flex gap-5 items-center
			border-2 border-[#1b1b1b]
}

.quick-graph h3 {
	@apply text-lg font-semibold 
}

/* .quick-graph p {
	@apply leading-5
} */

.favorite-dish-slider {
	@apply flex gap-2 border-hidden overflow-x-scroll transition-transform duration-300
	;

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


.favorite-restaurant-slides {
	@apply flex
}

.favorite-restaurant-slides > li {
	@apply select-text
}

.latest-orders-table-container {
	@apply w-full border-2 border-[#1b1b1b] 
}

.latest-orders-table-container table {
	@apply w-full
}

.latest-orders-table-container table thead th, .latest-orders-table-container table tbody td {
	@apply py-2 
	;
}

.latest-orders-table-container table th {
	@apply text-start border-b-2 border-[#1b1b1b]/50 
			;
}

.latest-orders-table-container table tr {
	@apply border-b border-[#1b1b1b]/50
	;
}
.latest-orders-table-container table tr:last-child {
	@apply border-b-0

}

.latest-orders-table-container table td:first-child, .latest-orders-table-container table th:first-child {
	@apply pl-5
}

.latest-orders-table-container table td:last-child, .latest-orders-table-container table th:last-child {
	@apply pr-5
}

.latest-orders-table-container table a {
	@apply hover:underline
}

</style>