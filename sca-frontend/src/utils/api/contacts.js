import axios from 'axios'
import { throwError } from './api'

const getContacts = async () => {
    try {
        const resp = await axios.get('/api/contacts')

        return resp.data
    } catch (error) {
        throwError(error)
    }
}


const contactApi = {
    getContacts,

    storeContacts: async data => {
        try {
            const resp = await axios.post('/api/contacts', data)

            return resp.data
        } catch (error) {
            throwError(error)
        }
    },

    getContact: async id => {
        try {
            const resp = await axios.get('/api/contacts/' + id)

            return resp.data
        } catch (error) {
            throwError(error)
        }
    },

    updateContact: async (id, data) => {
        try {
            const resp = await axios.patch(`/api/contacts/${id}`, data)

            return resp.data
        } catch (error) {
            throwError(error)
        }
    },

    deleteCotanct: async id => {
        try {
            const resp = await axios.delete(`/api/contacts/${id}`)

            return resp.data
        } catch (error) {
            throwError(error)
        }
    }
}

export default contactApi