import React, { useEffect, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import contactStore from '../../store/contact-store'
import contactApi from '../../utils/api/contacts'
import toast from '../../utils/toast'

const Contacts = () => {
    const [contacts, setContacts] = contactStore.useContacts()
    const [isFetching, setIsFetching] = useState(false)

    const fetchContacts = useCallback(async () => {
        setIsFetching(true)
        try {
            const data = await contactApi.getContacts()

            setContacts(data.contacts)
        } catch (error) {
            toast.show('error', error.message)
        }

        setIsFetching(false)
    }, [setContacts])

    useEffect(() => {
        fetchContacts()
    }, [fetchContacts])

    return (
        <>
            <MainLayout.MainHeader
                title="Contacts"
                actionText="Create New"
                actionTo={"/contacts/create"}
            />

            {isFetching &&
                <div className="flex justify-end text-xs text-gray-500">
                    Getting contacts information...
                </div>
            }
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Telp
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {contacts.map((contact) => (
                                        <tr key={contact.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{contact.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{contact.telp}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link to={`/contacts/${contact.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contacts