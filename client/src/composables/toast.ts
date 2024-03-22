
const parentToast = document.createElement('div');

parentToast.classList.add('tost');

document.body.append(parentToast);

export const useTost = (toastMessage: string, duration: number = 3000) => {
	const newTost = document.createElement('div');
	newTost.classList.add('tost-n');
	newTost.style.setProperty('--tost-timeout', `${duration}ms`);

	const tostContent = document.createElement('p');
	tostContent.innerText = toastMessage;
	newTost.appendChild(tostContent);

	parentToast.appendChild(newTost);

	setTimeout(() => newTost.classList.add('tost-show'), 0);
   
	let remainingTime = duration;
	let tostId = setTimeout(() => {
		newTost.classList.add('tost-hide')
		setTimeout(() => newTost.remove(), 500)
	}, duration);

	newTost.addEventListener('mouseenter', () => {
		clearTimeout(tostId);
		newTost.style.setProperty('--tost-play-state', 'paused');
		
		const computedStyle = getComputedStyle(newTost, '::before');
		
		const currentWidth = parseFloat(computedStyle.width);
		const actualWidth = newTost.getBoundingClientRect().width;

		const animationDuration = parseInt(computedStyle.animationDuration) * 1000;
		
		remainingTime = (currentWidth / actualWidth) * animationDuration;
	})

	newTost.addEventListener('mouseleave', () => {
		newTost.style.setProperty('--tost-play-state', 'running');
		tostId = setTimeout(() => {
			newTost.classList.add('tost-hide')
			setTimeout(() => newTost.remove(), 500)
		}, remainingTime);
	})
}