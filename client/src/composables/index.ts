import Flip from 'number-flip-ts';

export function initGlideStatistics() {
	const statisticsEl = document.getElementById('statistics') as HTMLElement;

	const observerOptions: IntersectionObserverInit = {
		root: null, // Use the viewport as the root
		threshold: 0.15, // Percentage of the element that must be visible to trigger
	};

	const statisticsObserver = new IntersectionObserver(async (entries, observer) => {
		if (entries[0].isIntersecting) {
			const restaurants = new Flip({
				node: document.getElementById('statisticsRestaurants')!,
				from: 0,
				to: 45,
				duration: 2,
			});
		
			const products = new Flip({
				node: document.getElementById('statisticsProducts')!,
				from: 0,
				to: 850,
				duration: 2 
			});
		
			const users = new Flip({
				node: document.getElementById('statisticsUsers')!,
				from: 0,
				to: 100,
				duration: 2 
			});
		
			const reviews = new Flip({
				node: document.getElementById('statisticReviews')!,
				from: 0,
				to: 999,
				duration: 2 // second
			});
			observer.unobserve(statisticsEl);

    		// TODO: Fetch statistics data periodically from server
		} 
	}, observerOptions);

	statisticsObserver.observe(statisticsEl);
}