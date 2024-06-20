export default () => {
	const toggleDialog = (toggleClass: string) => {
		const el = document.querySelector(toggleClass ?? '.my-dialog') as HTMLDialogElement;
	
		// check if it has the "open" attribute
		if (el.hasAttribute('open')) 
			el.close();
		else 
			el.showModal();
	};

	return {
		toggleDialog,
	};
}