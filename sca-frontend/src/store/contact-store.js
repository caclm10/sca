import { createGlobalState } from 'react-use'

const contactStore = {
    useContacts: createGlobalState([]),
}

export default contactStore