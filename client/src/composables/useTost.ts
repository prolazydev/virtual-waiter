// TODO: make this a composable to call it on app level
const parentToast = document.createElement('div');
parentToast.classList.add('tost');
document.body.append(parentToast);

let tostId: number = -1;
// TODO: add another parameter to change the type of tost (success, error, warning, info)

/**
 * Show a tost message
 * @param {string} toastMessage 
 * @param {number} duration - Default is 3000ms
 */
export default (toastMessage: string, duration: number = 3000) => {
	const newTost = document.createElement('div');
	newTost.setAttribute('popover', 'manual');
	newTost.classList.add('tost-n');
	newTost.style.setProperty('--tost-timeout', `${duration}ms`);

	newTost.id = `tost_${tostId++}`

	const tostContent = document.createElement('p');
	tostContent.innerText = toastMessage;
	newTost.appendChild(tostContent);

	parentToast.appendChild(newTost);

	newTost.showPopover();
	setTimeout(() => newTost.classList.add('tost-show'), 0);
   
	let remainingTime = duration;
	let tostTimeoutId = setTimeout(() => {
		newTost.classList.add('tost-hide')
		setTimeout(() => newTost.remove(), 500)
	}, duration);

	newTost.addEventListener('mouseenter', () => {
		clearTimeout(tostTimeoutId);
		newTost.style.setProperty('--tost-play-state', 'paused');
		
		const computedStyle = getComputedStyle(newTost, '::before');
		
		const currentWidth = parseFloat(computedStyle.width);
		const actualWidth = newTost.getBoundingClientRect().width;

		const animationDuration = parseInt(computedStyle.animationDuration) * 1000;
		
		remainingTime = (currentWidth / actualWidth) * animationDuration;
	})

	newTost.addEventListener('mouseleave', () => {
		newTost.style.setProperty('--tost-play-state', 'running');
		tostTimeoutId = setTimeout(() => {
			newTost.classList.add('tost-hide')
			setTimeout(() => newTost.remove(), 500)
		}, remainingTime);
	})
}