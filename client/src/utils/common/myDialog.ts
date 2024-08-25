export default () => {
	const toggleDialog = (toggleClass: string, onShow?: () => void, onClose?: () => void) => {
		const el = document.querySelector(toggleClass ?? '.my-dialog') as HTMLDialogElement;
	
		// check if it has the "open" attribute
		if (el.hasAttribute('open')) {
			el.close();
            document.body.style.overflow = 'auto';
            if (onClose) onClose();
        }
		else {
            el.showModal();
            document.body.style.overflow = 'hidden';

            if (onShow) onShow();
        }
	};

    /**
     * Check if the dialog is closed
     * @param toggleClass 
     * @returns {boolean}
     */
    const isDialogClosed = (toggleClass: string): boolean => 
        !(document.querySelector(toggleClass ?? '.my-dialog') as HTMLDialogElement)
            .hasAttribute('open');
    

	return {
		toggleDialog,
        isDialogClosed,
	};
}