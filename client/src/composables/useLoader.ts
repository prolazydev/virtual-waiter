let progress = 0;
let interval: NodeJS.Timeout | null = null;

export default () => {
	const progressBar = document.getElementById('progressBar')!;

	const startLoader = () => {
		if (progress > 0) {
			progress = 0;

			progressBar.style.transitionProperty = 'none';
			
			progressBar.style.width = `${progress}%`;
			progressBar.style.opacity = '1';

			progressBar.style.transitionProperty = 'all';
		}

		if (interval) 
			clearInterval(interval);
		
		interval = setInterval(() => {
			progress += 10;
			progressBar.style.width = `${progress}%`;
		}, 500);
	};

	const clearProgress = () => clearInterval(interval!);

	const setProgress = (value: number) => {
		progress = value;
		progressBar.style.width = `${progress}%`;
	}

	const finishLoader = () => {
		if (interval) 
			clearInterval(interval);
		
		progress = 100;
		progressBar.style.width = `${progress}%`;
		setTimeout(() => progressBar.style.opacity = '0', 500);
	};

	return {
		startLoader,
		finishLoader,
		setProgress,
		clearProgress,
	}
};