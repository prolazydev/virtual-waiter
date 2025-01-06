let progress = 0;
let interval: NodeJS.Timeout | null = null;
let progressBar: HTMLElement;

export default () => {
    if (!progressBar) 
       progressBar = document.getElementById('progressBar')!;

	const startLoader = () => {
		if (progress > 0) {
			progressBar.style.transitionProperty = 'none';
			progress = 0;

			
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
	/** Finishes the loader and hides it. */
	const finishLoader = () => {
		if (interval) 
			clearInterval(interval);
		
		progress = 100;
		progressBar.style.width = `${progress}%`;
		setTimeout(() => {
            progressBar.style.opacity = '0'
            setTimeout(() => {
                // progress = 0;
                progressBar.style.width = `0%`;
            }, 150);

        }, 500);
	};

	/**
	 * Waits for the loader to finish and invokes the callback or the timeout handler.
	 * @param callback The function to invoke when the loader finishes.
	 * @param timeout Timeout duration in milliseconds.
	 * @param timeoutCallback The function to invoke if the timeout is reached.
	 */
	const waitForLoader = (
		callback: () => void,
		timeout: number,
		timeoutCallback: () => void
	): void => {
		let timeoutId: NodeJS.Timeout | null = null;
		let intervalChecker: NodeJS.Timeout | null = null;

		// Start a timeout handler
		timeoutId = setTimeout(() => {
			if (intervalChecker) clearInterval(intervalChecker);
			timeoutCallback();
		}, timeout);

		// Periodically check the progress
		intervalChecker = setInterval(() => {
			if (progress >= 100) {
				if (timeoutId) clearTimeout(timeoutId);
				if (intervalChecker) clearInterval(intervalChecker);
				callback();
			}
		}, 100); // Check every 100ms
	};

	return {
		startLoader,
		finishLoader,
		setProgress,
		clearProgress,
		waitForLoader,
	}
};