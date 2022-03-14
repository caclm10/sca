import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiTrash } from 'react-icons/hi'
import { BiLoaderAlt } from 'react-icons/bi'
import ContactForm from '../../components/ContactForm'
import MainLayout from '../../layouts/MainLayout'
import contactStore from '../../store/contact-store'
import contactApi from '../../utils/api/contacts'
import toast from '../../utils/toast'

const EditContact = () => {
    const { contactId } = useParams()
    const navigate = useNavigate()
    const setContacts = contactStore.useContacts()[1]
    const [contact, setContact] = useState(null)
    const [isDeleting, setIsDeleting] = useState(null)

    const fetchContact = useCallback(async () => {
        try {
            const data = await contactApi.getContact(contactId)

            setContact(data.contact)
        } catch (error) {
            toast.show('error', error.message)
        }
    }, [contactId])

    const deleteContactHandler = async () => {
        if (!window.confirm('Are you sure you want to delete this contact?')) return false;

        setIsDeleting(true)
        try {
            const data = await contactApi.deleteCotanct(contactId)

            toast.show('success', data.message)
            navigate('/contacts')
        } catch (error) {
            setIsDeleting(false)
            toast.show('error', error.message)
        }

    }

    const submitHandler = async (formData, onSuccess, onError, onFinish) => {
        try {
            const data = await contactApi.updateContact(contactId, formData)
            const newData = await contactApi.getContacts()

            setContacts(newData.contacts)

            onSuccess()
            toast.show('success', data.message)
        } catch (error) {
            if (error.errors) onError(error.errors)
            toast.show('error', error.message)
        }

        onFinish()
    }

    useEffect(() => {
        fetchContact()
    }, [fetchContact])

    return (
        <>
            <MainLayout.MainHeader
                title="Edit Contact"
                withAction={false}
            />

            <div className="flex justify-end">
                <button type="button" className="btn red icon-only" onClick={deleteContactHandler}>
                    {!isDeleting && <HiTrash />}
                    {isDeleting && <BiLoaderAlt className="animate-spin" />}

                </button>
            </div>

            <ContactForm
                onSubmit={submitHandler}
                editMode
                data={contact}
            />
        </>
    )
}

export default EditContact