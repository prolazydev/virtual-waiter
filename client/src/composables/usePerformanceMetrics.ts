const timeToLoad = ref<number>(0)

export default () => {
	const start = () => {
		timeToLoad.value = performance.now()
	}

	const end = () => {
		timeToLoad.value = (performance.now() - timeToLoad.value)
	}

	return { timeToLoad, start, end }
}