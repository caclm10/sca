import React from 'react'
import ContactForm from '../../components/ContactForm'
import MainLayout from '../../layouts/MainLayout'
import contactStore from '../../store/contact-store'
import contactApi from '../../utils/api/contacts'
import toast from '../../utils/toast'

const CreateContact = () => {
    const setContacts = contactStore.useContacts()[1]

    const submitHandler = (formData, onSuccess, onError, onFinish) => {
        contactApi.storeContacts(formData)
            .then(data => {
                setContacts(prev => [
                    data.contact,
                    ...prev
                ])

                onSuccess()
                toast.show('success', data.message)
            })
            .catch(error => {
                if (error.errors) onError(error.errors)
                toast.show('error', error.message)
            })
            .finally(() => {
                onFinish()
            })
    }

    return (
        <>
            <MainLayout.MainHeader
                title="Create Contact"
                withAction={false}
            />

            <ContactForm
                onSubmit={submitHandler}
                editMode={false}
            />
        </>
    )
}

export default CreateContact