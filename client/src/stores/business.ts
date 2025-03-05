
export default
defineStore('business', () => {
	const selectedBusiness = ref('All');

	const selectBusiness = (newBusiness: string) =>
		selectedBusiness.value = newBusiness;
	
	return {
		selectedBusiness,
		setNewLoginBusiness: selectBusiness,
	}
}, { persist: true });