import { DEFAULT_TOST_DURATION } from '@/constants/settings/tost';
import type { Business, BusinessEdit, EditContactField } from '@/types/models/business';
const { toggleDialog, isDialogClosed } = myDialog();
const loader = useLoader();

export default () => {
    const addContactField = (
        businessEdit: Ref<Partial<BusinessEdit>>, 
        contactListFields: Ref<EditContactField[]>, 
        type: 'email' | 'phone'
    ) => {
        if (!businessEdit.value.contacts) 
            businessEdit.value.contacts = [{ contactType: type, value: '' }];
        else
            businessEdit.value.contacts!.push({ contactType: type, value: '' });
    
        contactListFields.value.push({ type, value: '', state: 'save' });
    }
    
    // Edit or Delete contact field
    const toggleEditOrCreateContact = async (
        business: Ref<Business>,
        businessEdit: Ref<Partial<BusinessEdit>>, 
        contactListFields: Ref<EditContactField[]>, 
        index: number,
    ) => {
        try {
            if (contactListFields.value[index].state === 'save') {
                if (!contactListFields.value[index].value) 
                    return useTost('Please enter a valid contact information!', 2000);

                // if the contact value is the same as the original value
                if (contactListFields.value[index].value === businessEdit.value.contacts![index].value) 
                    return contactListFields.value[index].state = 'edit';
            
                loader.startLoader();
                // If that contact exists in the database and the value is different from the original value
                if ((contactListFields.value[index].value !== businessEdit.value.contacts![index].value) && businessEdit.value.contacts![index].value.length > 0) 
                    await editContact(business, businessEdit, contactListFields, index);
                
                // If the contact value is different from the original value and the original value is empty
                else if ((contactListFields.value[index].value !== businessEdit.value.contacts![index].value) && !businessEdit.value.contacts![index].value)
                    await createContact(business, businessEdit, contactListFields, index);
    
                contactListFields.value[index].state = 'edit';
            }
            else 
                contactListFields.value[index].state = 'save';
        } catch (error) {
			// TODO: Handle error
            console.error(error);
        } finally {
            loader.finishLoader();
        }
    };

    const localDeleteContactField = (
        businessEdit: Ref<Partial<BusinessEdit>>, 
        contactListFields: Ref<EditContactField[]>, 
        deleteContactInfo: Ref<{ title: string, index: number }>, 
        index: number,
    ) => {
        // If the contact value is empty or the original value is empty
        if (!contactListFields.value[index].value || !businessEdit.value.contacts![index].value) {
            contactListFields.value.splice(index, 1);
            businessEdit.value.contacts!.splice(index, 1);
            return;
        }
    
        deleteContactInfo.value.title = `Are you sure you want to permanently delete your ${contactListFields.value[index].type} contact of: ${contactListFields.value[index].value} ?`;
        deleteContactInfo.value.index = index;

        toggleDialog('.delete-contact-info-dialog');
    };

    const deleteContactField = async (
        business: Ref<Business>,
        businessEdit: Ref<Partial<BusinessEdit>>, 
        contactListFields: Ref<EditContactField[]>, 
        deleteContactInfoDialog: Ref<EditContactField>,
        index: number,
    ) => {
        try {
            loader.startLoader();
            deleteContactInfoDialog.value.processingState = 'loading';

            const { response, error } = await myFetch(
                `business/delete/${business.value._id}/contact`, 
                { value: contactListFields.value[index].value }, 
                { method: 'PATCH' }
            );
    
            if (response.value?.ok) {
                contactListFields.value.splice(index, 1);
                businessEdit.value.contacts!.splice(index, 1);
    
                useTost('Contact information deleted successfully!');

                deleteContactInfoDialog.value.processingState = 'success';
                setTimeout(() => {
                    deleteContactInfoDialog.value.processingState = 'idle';

                    if(isDialogClosed('.delete-contact-info-dialog')) 
                        return;
                    
                    toggleDialog('.delete-contact-info-dialog');
                }, DEFAULT_TOST_DURATION);
            }
            else {
                console.error(error.value);
				useTost('Error: Something bad happened on our side :/ Please try again later.', 3000);
            }
        } catch (error) {
			// TODO: Handle error
            console.error(error);
        } finally {
            loader.finishLoader();
        }
    };

	const toggleCloseDialog = (
		toggleClass: string,
        contactListFields: Ref<EditContactField[]>, 
		retryClose: Ref<boolean>,
	) => {
		if (contactListFields.value.some((field) => field.state === 'save' && field.value !== '')) {
			if (retryClose.value) {
				toggleDialog(toggleClass);
				contactListFields.value = contactListFields.value.filter((field) => field.state !== 'save');
				retryClose.value = false;
				return;
			}
			// Notify the user that they have unsaved changes
			useTost('Warning! You have unsaved changes that will be lost if you close the dialog.', 3000);
			retryClose.value = true;
		} else {
			toggleDialog(toggleClass);
			contactListFields.value = contactListFields.value.filter((field) => field.value !== '');
		}
	}

    return {
        addContactField,
        localDeleteContactField,
        toggleEditOrCreateContact,
        deleteContactField,
		toggleCloseDialog
    }
};

// private
async function editContact(
    business: Ref<Business>,
    businessEdit: Ref<Partial<BusinessEdit>>, 
    contactListFields: Ref<EditContactField[]>, 
    index: number,
) {
    const contactData = {
        oldValue: businessEdit.value.contacts![index].value,
        value: contactListFields.value[index].value
    }

    contactListFields.value[index].processingState = 'loading';
    const { response, error } = await myFetch<Business>(`business/edit/${business.value._id}/contact`, contactData, { method: 'PATCH' });

    if (response.value?.ok) {
        contactListFields.value[index].processingState = 'success';
        useTost('Contact information updated successfully!');

        setTimeout(() => {
            contactListFields.value[index].processingState = 'idle'
            contactListFields.value[index].state = 'edit';

            // Update the contact value in the businessEdit object
            businessEdit.value.contacts![index].value = contactListFields.value[index].value;
        }, DEFAULT_TOST_DURATION);
    }
    else {
        contactListFields.value[index].processingState = 'error';
        setTimeout(() => contactListFields.value[index].processingState = 'idle', 1000);

		useTost('Error: Something bad happened on our side :/ Please try again later.', 3000);
        console.error(error.value);
    }
}

async function createContact(
    business: Ref<Business>,
    businessEdit: Ref<Partial<BusinessEdit>>, 
    contactListFields: Ref<EditContactField[]>, 
    index: number,
) {
    const data = {
        contactType: contactListFields.value[index].type,
        value: contactListFields.value[index].value
    }
    const id = business.value._id;

    contactListFields.value[index].processingState = 'loading';
    const { response, error } = await myFetch(
        `business/add/${id}/contact`,
        data, 
        { method: 'PATCH' },
    );

    if (response.value?.ok) {
        useTost('Contact information created successfully!');
        contactListFields.value[index].processingState = 'success';

        businessEdit.value.contacts![index].value = contactListFields.value[index].value;
        setTimeout(() => {
            contactListFields.value[index].processingState = 'idle'
            contactListFields.value[index].state = 'edit';

            // Update the contact value in the businessEdit object
        }, DEFAULT_TOST_DURATION);
    }
    else {
        contactListFields.value[index].processingState = 'error';
        setTimeout(() => contactListFields.value[index].processingState = 'idle', 1000);

        // TODO: Handle the error
		useTost('Error: Something bad happened on our side :/ Please try again later.', 3000);
        console.error(error.value);
    }
}