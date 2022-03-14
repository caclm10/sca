import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Contacts from './pages/contacts/Contacts'
import CreateContact from './pages/contacts/CreateContact'
import EditContact from './pages/contacts/EditContact'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Toaster />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contacts">
            <Route path="create" element={<CreateContact />} />
            <Route path="" element={<Contacts />} />
            <Route path=":contactId" element={<EditContact />}></Route>
          </Route>
        </Routes>
      </MainLayout>
    </>
  )
}

export default App