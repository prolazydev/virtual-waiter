// const targetX = 50;
// const duration = 1000; // Duration for the scroll animation in milliseconds
// let startTime: number;

// function scrollOnce(timestamp: number) {
// 	if (!startTime) 
// 		startTime = timestamp;

// 	const elapsedTime = timestamp - startTime;
// 	const progress = Math.min(elapsedTime / duration, 1);
// 	const ease = easeInOutQuad(progress);

// 	const currentX = scrollContainer.scrollLeft;
// 	const newX = currentX + (targetX - currentX) * ease;

// 	scrollContainer.scrollLeft = newX;

// 	if (progress < 1) 
// 		requestAnimationFrame(scrollOnce);
// }

// const easeInOutQuad = (t: number) => 
// 	t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	// setTimeout(() => 
	// 	requestAnimationFrame(scrollOnce), 750);

export default function (element: string) {
	const scrollContainer = document.querySelector(element)! as HTMLElement;
	let isScrolling = false;
	let startX: number, scrollLeft: number;

	scrollContainer.addEventListener('mousedown', (e) => {
		isScrolling = true;
		startX = e.pageX - scrollContainer.offsetLeft;
		scrollLeft = scrollContainer.scrollLeft;
	});

	scrollContainer.addEventListener('mouseup', () => {
		isScrolling = false;
	});

	scrollContainer.addEventListener('mouseleave', () => {
		isScrolling = false;
	});

	scrollContainer.addEventListener('mousemove', (e) => {
		e.preventDefault();
		if (!isScrolling) return;
		const x = e.pageX - scrollContainer.offsetLeft;
		const walk = x - startX;

		scrollContainer.scrollLeft = scrollLeft - walk;
	});

	// Add event listener for scroll wheel
	// scrollContainer.addEventListener('wheel', (e) => {
	// 	e.preventDefault();
	// 	const scrollAmount = e.deltaY;
	// 	scrollContainer.scrollLeft += scrollAmount;
	// 	// scrollContainer.appendChild(scrollContainer.firstChild as Node)
	// });
}