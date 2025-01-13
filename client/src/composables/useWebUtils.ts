export default () => {
	const router = useRouter();
	const route = useRoute();

	const addQueryParam = (key: string, value: string) => {
		router.push({
			query: {
				...route.query, // Preserve existing query params
				[key]: value,  // Add or update the new query param
			},
		});
	}

	return {
		addQueryParam,
	};
}