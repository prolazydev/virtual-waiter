<template>
	<div v-if="business" class="page-main business-view">
		<div class="flex flex-col gap-3">
			<!-- TODO: create a breadcrumb like style for where this item came from eg: Ferizaj > SteakHouse Restaurant > Ferizaj SteakHouse -->
			<div class="flex justify-between items-baseline">
				<div class="flex gap-1 items-baseline">
					<h1 class="text-4xl font-bold">{{ business.username }}</h1>
					<span v-if="!business.verified"><Tooltip text="Soulja boi!" _class="mb-2" class="whitespace-nowrap"><LucideIcon name="BadgeCheck" :size="24" :stroke-width="2" /></Tooltip></span>
				</div>

				<div class="group-links flex gap-2 items-baseline text-lg">
					<Tooltip _class="mb-3" text="Review">
						<button class="px-1 py-1" type="button"><LucideIcon name="PenLine" :size="22" :stroke-width="2" /></button>
					</Tooltip>
					<Tooltip _class="mb-3" text="Save">
						<button class="px-1 py-1" type="button"><LucideIcon name="Heart" :size="22" :stroke-width="2" /></button>
					</Tooltip>
					<Tooltip _class="mb-3" text="Share">
						<button class="px-1 py-1" type="button"><LucideIcon name="Share2" :size="22" :stroke-width="2" /></button>
					</Tooltip>
				</div>
			</div>
			<div class="group-links flex gap-3 justify-between">
				<div>
					<Tooltip _class="mb-3" :text="`${business.averageRating} stars`">
						<Review :stars="business.averageRating" :reviews="business.reviews" :sizes="28" _p-class="text-lg font-semibold" />
					</Tooltip>

					<div class="w-[1px] bg-gray-200"></div>

					<router-link to="/"><b>#1 </b>of Restaurans in Ferizaj</router-link>
				</div>
				<!-- TODO: Add Edit Business button for the owner of the business -->

				<Tooltip v-if="isAuth() && user.id === business.userId" _class="mb-3 w-max" :text="`Settings for ${business.username}`">
					<!-- <button class="px-1 py-1" type="button"><LucideIcon name="PenLine" :size="22" :stroke-width="2" /></button> -->
					<router-link class="px-1 py-1 text-lg" :to="{ path: `/business/settings/${business._id}` }">
						<LucideIcon name="Settings" :size="22" :stroke-width="2" />
					</router-link>
				</Tooltip>
			</div>
			<div class="group-links flex gap-3">
				<!-- TODO: Add to the business the google link address for router link -->
				<a v-if="business.streetAddress && business.streetAddress.primary" href="#"><LucideIcon name="MapPin" :size="22" :stroke-width="1.5" />{{ business.streetAddress.primary.address }}</a>

				<div class="w-[1px] bg-gray-200"></div>
				<a :href="`tel:+${business.phone}`"><LucideIcon name="Phone" :size="22" :stroke-width="1.5" />{{ business.phone }}</a>

				<div class="w-[1px] bg-gray-200"></div>
				<a href="#"><LucideIcon name='Laptop' :size="22" :stroke-width="1.5" />Website</a>

				<div class="w-[1px] bg-gray-200"></div>
				<a href="#"><LucideIcon name='SquareMenu' :size="22" :stroke-width="1.5" />Menu</a>

				<div class="w-[1px] bg-gray-200"></div>
				<div class="flex gap-1">
					<a href="#"><LucideIcon class="text-emerald-800" name='Clock5' :size="22" :stroke-width="1.5" /><b class="text-emerald-600">Open now</b> <div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div> 10:00 AM - 10:00 PM</a>
					<div class="cursor-pointer my-auto">
						<!-- TODO: Implement the business hours -->
						<LucideIcon class=" " name='Info' :size="18" :stroke-width="1.5" />
					</div>
				</div>

				<div class="w-[1px] bg-gray-200"></div>
				<a href="#"><LucideIcon name='SquareMenu' :size="22" :stroke-width="1.5" />Book now</a>

				<div class="ml-auto">
					<router-link class="link-address" to="/">Improve this listing</router-link>
				</div>
			</div>
		</div>
		
		<div class="border-b-4 border-b-[#1b1b1b]"></div>

		<!-- TODO: make photos clickable to show the gallery of photos -->
		<div class="flex gap-2 h-96 max-h-96">
			<div class="image-item-container w-1/2 h-96">
				<img class="" src="https://cdn.sortiraparis.com/images/80/100789/834071-too-restaurant-too-hotel-paris-photos-menu-entrees.jpg" alt="Presentational image" >
			</div>
			<div class="w-1/2 max-h-96 flex flex-col gap-y-3">
				<div class="h-[calc(50%-0.375rem)] flex gap-x-3">
					<div class="image-item-container w-1/2">
						<img class="" src="https://cdn.sortiraparis.com/images/80/100789/834071-too-restaurant-too-hotel-paris-photos-menu-entrees.jpg" alt="Presentational image" >
					</div>
					<div class="image-item-container w-1/2 ">
						<img class="" src="https://cdn.sortiraparis.com/images/80/100789/834071-too-restaurant-too-hotel-paris-photos-menu-entrees.jpg" alt="Presentational image" >
					</div>
				</div>

				<div class="h-[calc(50%-0.375rem)] flex gap-x-3">
					<div class="image-item-container w-1/2">
						<img class="" src="https://cdn.sortiraparis.com/images/80/100789/834071-too-restaurant-too-hotel-paris-photos-menu-entrees.jpg" alt="Presentational image" >
					</div>
					<div class="image-item-container w-1/2">
						<img class="" src="https://cdn.sortiraparis.com/images/80/100789/834071-too-restaurant-too-hotel-paris-photos-menu-entrees.jpg" alt="Presentational image" >
					</div>
				</div>
			</div>
		</div>

		<div class="flex gap-5">
			<div class="w-3/4 flex flex-col gap-5">
				<!-- <div class="">
					<button class="write-review link-address" type="button">
						<LucideIcon class="fill-transparent" name="Star" :size="22" :stroke-width="2" />
						Write a review
					</button>
				</div>

				<hr class="border-[#1b1b1b]/50"> -->

				<div class="flex gap-5">
					<div class="w-full h-auto p-5 flex flex-col gap-5 border-2 border-[#1b1b1b]">
						<h1 class="text-2xl pb-3 font-semibold border-b border-b-[#1b1b1b]/50">Ratings</h1>

						<h1 class="flex gap-1 text-2xl font-semibold items-center">{{ business.averageRating }} 
							<Review :stars="business.averageRating" :reviews="business.reviews" :sizes="24" _p-class="text-lg font-semibold" />
						</h1>
						<div class="flex flex-col gap-1">
							<p><b>#1 </b>of 30 Steakhouse in Ferizaj</p>
							<p><b>#1 </b>of 30 Restaurans in Ferizaj</p>
						</div>


						<h2 class="text-xl font-semibold">Review highlitghts</h2>
						<div class="flex items-center">
							<div class="flex gap-3 items-center">
								<img class="w-12" src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="">
								<!-- <LucideIcon name="UtensilsCrossed" :size="22" :stroke-width="2" />
								<h3 class="text-xl">Food</h3> -->
								<p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa aperiam facere error ab perferendis? Mollitia fugit suscipit libero laborum odit.</p>
							</div>
							<!-- <Review :stars="business.averageRating" :sizes="22" /> -->
						</div>
						<!-- TODO: maybe delete or replace "review highlitghts" with "ratings" -->
						<!-- <h2 class="text-xl font-semibold">Ratings</h2>
						<div class="w-full justify-between flex items-center">
							<div class="flex gap-3 items-center">
								<LucideIcon name="UtensilsCrossed" :size="22" :stroke-width="2" />
								<h3 class="text-xl">Food</h3>
							</div>
							<Review :stars="business.averageRating" :sizes="22" />
						</div>
						<div class="w-full justify-between flex items-center">
							<div class="flex gap-3 items-center">
								<LucideIcon name="HandPlatter" :size="22" :stroke-width="2" />
								<h3 class="text-xl">Service</h3>
							</div>
							<Review :stars="business.averageRating" :sizes="22" />
						</div>
						<div class="w-full justify-between flex items-center">
							<div class="flex gap-3 items-center">
								<LucideIcon name="Sparkle" :size="22" :stroke-width="2" />
								<h3 class="text-xl">Atmosphere</h3>
							</div>
							<Review :stars="business.averageRating" :sizes="22" />
						</div> -->
					</div>
					<div class="w-full h-auto p-5 flex flex-col gap-3 border-2 border-[#1b1b1b]">
						<h1 class="mb-2 text-2xl pb-3 font-semibold border-b border-b-[#1b1b1b]/50">Details</h1>

						<div class="flex flex-col gap-1">
							<h2 class="text-xl font-semibold">About</h2>
							<!-- TODO: show price range -->
							<p class="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eveniet culpa minus aliquid placeat eius quibusdam, in doloremque harum facere.</p>
						</div>

						<div class="flex flex-col gap-1">
							<h2 class="text-xl font-semibold">Price range</h2>
							<!-- TODO: show price range -->
							<p class="text-lg">€5 - €35</p>
						</div>

						<div class="flex flex-col gap-1">
							<h2 class="text-xl font-semibold">Cuisines</h2>
							<div v-if="business.categories" class="flex gap-2 group-links">
								<a class="business-category" v-for="(item, index) in business.categories" :key="index" href="#">{{ item }}</a>
							</div>
						</div>
					</div>
				</div>

				<div class="w-full h-fit p-5 flex flex-col gap-3 border-2 border-[#1b1b1b]">
					<h2 class="text-2xl pb-3 font-semibold border-b border-b-[#1b1b1b]/50">Menu</h2>

					<div class="flex flex-col gap-2">
						<div class="flex justify-between">
							<p class="text-lg font-semibold">Popular dishes</p>
							<!-- TODO: link to the full menu of this business -->
							<a href="#">View full menu <span>></span></a>
						</div>

						<div classs="w-fit">
							<div class="slider-container">
								<div class="slider">
									<!-- TODO: show a list of products -->
									<button v-for="(item, index) in 25" :key="index" @click="handleShowProduct" class="slide" type="button">
										<div class="relative">
											<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimagesvc.meredithcorp.io%2Fv3%2Fmm%2Fimage%3Fq%3D85%26c%3Dsc%26poi%3Dface%26w%3D2000%26h%3D1000%26url%3Dhttps%3A%252F%252Fstatic.onecms.io%252Fwp-content%252Fuploads%252Fsites%252F43%252F2020%252F03%252F6584062-2000.jpg&f=1&nofb=1&ipt=cc97d9ac7b239997687df92748b89d3a73fa1eb5e90b75c7330e6b3b6676426a&ipo=images" alt="Presentational image" >
											<p class="text-xl text-white absolute bottom-2 left-1 drop-shadow">$3</p>
										</div>
										<div class="flex flex-col text-start">
											<h3>{{ item }} Pizza</h3>
											<div class="flex gap-1 items-center">
												<p>10 Photos</p>
												<div class="w-1 h-1 mx-1 bg-gray-400 rounded-full" />
												<p>5 Reviews</p>
											</div>
										</div>
									</button>	
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex gap-5">
					<div class="w-full h-fit p-5 flex flex-col gap-5 border-2 border-[#1b1b1b]">
						<h2 class="text-2xl pb-3 font-semibold border-b border-b-[#1b1b1b]/50">Location</h2>
						<!-- <hr class="border-[#1b1b1b]/50" /> -->

						<div class="w-full h-64 border-2 border-[#1b1b1b]">
							<p>google map here</p>
						</div>

						<template v-if="business.streetAddress && business.streetAddress.primary">
							<hr class="border-[#1b1b1b]/50">
							<div class="flex justify-between">
								<div class="flex flex-col">
									<a href="#">Google map link</a>
									<p>{{ business.streetAddress.primary.address }}</p>
									<p>{{ business.streetAddress.primary.zipCode }}</p>
								</div>
								<div class="flex flex-col">
									<button class="px-2 py-1 font-semibold text-white bg-[#1b1b1b] border-2 border-[#1b1b1b] active:border-b-white transition-all" type="button">
										Get Directions
									</button>
								</div>
							</div>
						</template>
					</div>
					<div class="w-full p-5 flex flex-col gap-5 border-2 border-[#1b1b1b]">
						<h2 class="text-2xl pb-3 font-semibold border-b border-b-[#1b1b1b]/50">Hours</h2>
						<!-- <hr class="border-[#1b1b1b]/50" /> -->
						
						<!-- TODO: Show events (implement special events, eg: rock night [9PM]) -->
						<div class="w-full h-full flex gap-3">
							<!-- TODO: Show events (implement special events, eg: rock night [9PM]) -->
							<div v-if="business.is24 && business.hours" class="w-64 flex flex-col justify-between">
								<div class="flex" v-for="(key) in Object.keys(business.hours)" :key="key" >
									<h3 class="w-1/2 text-xl font-semibold capitalize">{{ key }}</h3>
									<p>{{ (business.hours)[key as KeyHours] }} test</p>
								</div>
							</div>
							<div v-else class="flex w-full items-center justify-center">
								<h3 class="text-xl font-semibold">Open 24h</h3>
							</div>
						</div>
					</div>
				</div>
				<div class="w-full p-5 flex flex-col gap-5 border-2 border-[#1b1b1b]">
					<h2 class="text-2xl pb-3 font-semibold border-b border-b-[#1b1b1b]/50">Amenities and More</h2>
					<!-- TODO: Show a list of other properties/attributes -->
					<!-- TODO: Make custom component to forloop this -->
					<div class="h-[35rem] w-[30rem] flex flex-wrap text-lg font-semibold justify-around">
						<div class="amedety-item">
							<LucideIcon name="CalendarDays" :size="28" :stroke-width="1.5" />
							<p>Takes Reservations</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="Truck" :size="28" :stroke-width="1.5" />
							<p>Offers Delivery</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="Popcorn" :size="28" :stroke-width="1.5" />
							<p>Offers Takeout</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="Vegan" :size="28" :stroke-width="1.5" />
							<p>Vegan Options</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="CreditCard" :size="28" :stroke-width="1.5" />
							<p>Accepts Credit Cards</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="Gem" :size="28" :stroke-width="1.5" />
							<p>Casual, Trendy, Romantic, Classy</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="Volume2" :size="28" :stroke-width="1.5" />
							<p>Moderate Noise</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="HandPlatter" :size="28" :stroke-width="1.5" />
							<p>Offers Catering</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="UsersRound" :size="28" :stroke-width="1.5" />
							<p>Good for Groups</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="Wifi" :size="28" :stroke-width="1.5" />
							<p>Free Wi-Fi</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="UtensilsCrossed" :size="28" :stroke-width="1.5" />
							<p>Takeout</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="HandPlatter" :size="28" :stroke-width="1.5" />
							<p>Table service</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="Blocks" :size="28" :stroke-width="1.5" />
							<p>Good for kids</p>
						</div>
						
						<div class="amedety-item">
							<LucideIcon name="TreePalm" :size="28" :stroke-width="1.5" />
							<p>Outdoor seating</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="SquareArrowOutUpRight" :size="28" :stroke-width="1.5" />
							<p>Good for groups</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="SquareArrowOutUpRight" :size="28" :stroke-width="1.5" />
							<p>Good for groups</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="SquareArrowOutUpRight" :size="28" :stroke-width="1.5" />
							<p>Good for groups</p>
						</div>
						<div class="amedety-item">
							<LucideIcon name="SquareArrowOutUpRight" :size="28" :stroke-width="1.5" />
							<p>Good for groups</p>
						</div>
					</div>
				</div>
			</div>
			<!-- TODO: implement reservations, orders (takeout), waitlist -->
			<!-- NOTE: needs: "sticky top-[6.75rem]" with "self-start" for sticky positioning -->
			<div class="w-full sticky top-[6.75rem] flex flex-col gap-5 self-start">
				<div class="h-fit p-5 flex flex-col gap-3 border-2 border-[#1b1b1b] z-10">
					<h1 class="text-2xl font-semibold">Make a reservation</h1>
					<form class="flex flex-col gap-2" @submit.prevent="">
						<MyDatePicker custom-style="w-full p-2 border-2 border-[#1b1b1b] z-10" is24hr @update:modelValue="e => reservationForm.date = e" mode="Date" />
						<div class="flex gap-2">
							<MyDatePicker custom-style="w-full p-2 border-2 border-[#1b1b1b]" v-model="reservationForm.date" :__placeholder="new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })" mode="time" is24hr />
							<select class="w-full p-2 border-2 border-[#1b1b1b]" name="reservationPeople" id="reservationPeople">
								<option value="1">1 person</option>
								<option value="2">2 people</option>
								<option value="3">3 people</option>
								<option value="4">4 people</option>
								<option value="5">5 people</option>
								<option value="6">6 people</option>
								<option value="7">7 people</option>
								<option value="8">8 people</option>
								<option value="9">9 people</option>
								<option value="10">10 people</option>
							</select>
						</div>

						<button class="w-full mx-auto p-2 py-[6px] font-semibold text-white border-4 border-[#1b1b1b] bg-[#1b1b1b] uppercase active:border-b-white transition-all">Find a table</button>
					</form>
				</div>

				<div class=" h-fit p-5 flex flex-col gap-3 border-2 border-[#1b1b1b]">
					<h1 class="text-2xl font-semibold ">Order Food</h1>
				</div>

				<div class="h-fit p-5 text-lg flex flex-col gap-3 border-2 border-[#1b1b1b]">
					<div class="flex justify-between items-center">
						<a class="font-semibold hover:underline" :href="`http://${business.website}`" target="_blank" rel="noopener noreferrer">{{ business.website?.slice(4) }}</a>
						<a :href="`http://${business.website}`" target="_blank" rel="noopener noreferrer">
							<LucideIcon name="SquareArrowOutUpRight" :size="26" :stroke-width="2" />
						</a>
					</div>

					<hr class="border-[#1b1b1b]/50">
					
					<div class="flex justify-between items-center">
						<a class="font-semibold hover:underline" :href="`tel:+${business.phone}`">{{ business.phone }}</a>
						<a :href="`tel:+${business.phone}`">
							<LucideIcon name="PhoneOutgoing" :size="26" :stroke-width="2" />
						</a>
					</div>

					<hr class="border-[#1b1b1b]/50">

					<div v-if="business.streetAddress" class="flex justify-between items-center">
						<!-- TODO: Have it be a single link -->
						<div class="flex flex-col">
							<a class="font-semibold hover:underline" :href="`https://www.google.com/maps/search/?api=1&query=${business.streetAddress.primary!.address}`">Get directions</a>
							<p class="font-semibold text-gray-500">{{ business.streetAddress.primary!.address }}</p>
						</div>
						<a :href="`https://www.google.com/maps/search/?api=1&query=${business.streetAddress.primary!.address}`">
							<LucideIcon name="MapPin" :size="28" :stroke-width="2" />
						</a>
					</div>

					<hr class="border-[#1b1b1b]/50">

					<button class="w-full mx-auto p-2 py-[6px] flex gap-5 items-center justify-center font-semibold text-base text-white border-4 border-[#1b1b1b] bg-[#1b1b1b] uppercase active:border-b-white transition-all" type="button">
						<LucideIcon name="Pencil" :size="22" :stroke-width="2" />
						Suggest an edit
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import 'v-calendar/style.css';
import { type Business, type KeyHours } from '@/types/business';

const { params } = useRoute('/business/[id]');
const router = useRouter();

const { user } = useUserStore();
const { isAuth } = useAuth();

const business = ref<Business>();

const reservationForm = ref({
	date: new Date(),
	time: '',
	people: 1,
});

onMounted(async () => {
	// useScrollX('.slider')
});

async function handleGetBusiness() {
	const { getBusinessSelfById } = businessService();
	try {
		const { response, statusCode, data } = await getBusinessSelfById(params.id as string);

		if (response.value!.ok && data.value)
			return business.value = data.value;

		switch (statusCode.value) {
			case 404:
				return await router.push({ name: 'not-found' });
			case 400:
				return await router.push({ name: '/error/bad-request' });
			// Add additional cases as needed
			default:
				return; // Handle other status codes if necessary
		}
			
	} catch (error) {
		console.error(error);
	}
}
await handleGetBusiness();
// NOTE: Needs to be called here since vue bugs out when changing routes for some strange reason

const handleShowProduct = () => {
	console.log('Show product');
}

</script>

<style scoped>
.business-view {
	@apply gap-5 py-10
}

.light-button {
	@apply border-b-2 border-b-[#1b1b1b] text-[#1b1b1b] font-semibold
}

.write-review {
	@apply flex gap-1 items-center text-lg font-semibold 
}

.write-review:hover svg {
	@apply fill-[#1b1b1b]
}

.write-review svg {
	@apply transition-all
}

.slider-container {
	overflow: hidden;
	width: 100%;
}

.slider {
	@apply flex gap-5
	;
	scroll-snap-type: x mandatory;	
	-webkit-overflow-scrolling: touch;
	overflow-x: auto;
}

.slide {
	scroll-snap-align: start;
	@apply min-w-64 h-fit flex flex-col gap-1
}

.slide img {
	@apply w-48 h-48 object-cover pb-1 border-b-4 border-[#1b1b1b]
}

.slide h3 {
	@apply font-semibold text-lg
}

.slide p {
	@apply font-semibold
}

/* .slider::-webkit-scrollbar {
  display: none;
}*/
/* Hide scrollbar for IE, Edge and Firefox */
/*.slider {
  -ms-overflow-style: none;
  scrollbar-width: none;  
} */

.link-address {
	@apply hover:border-b-gray-400 border-b border-b-transparent
}

.group-links a, .group-links button {
	@apply 	flex gap-1 items-center
			hover:border-b-gray-400 border-b border-b-transparent
}

.group-links > div {
	@apply flex gap-3 
}

.image-item-container {
	@apply flex object-cover border-2 border-[#1b1b1b] overflow-hidden
}

.image-item-container img {
	@apply  w-full h-auto object-cover transition-all duration-300 
			hover:scale-110
}

.business-category {
	@apply relative
}

.business-category::after {
	@apply absolute -right-1 content-[','];
}

.business-category:last-child::after {
	@apply content-[''];
}

.test input {
	@apply w-32
}

.amedeties-list {
	flex: 1 0 50%;
	box-sizing: border-box;
}

.amedety-item {
	@apply w-52 flex gap-1 items-center
	;
}
</style>