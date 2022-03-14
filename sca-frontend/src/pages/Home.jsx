import React from 'react'
import MainLayout from '../layouts/MainLayout'

const Home = () => {
    return (
        <>
            <MainLayout.MainHeader
                title="Home"
                withAction={false}
            />

            <div className="text-center">
                <h3 className="text-2xl font-bold">Welcome to Simple CRUD App (SCA)</h3>
                <p className="text-gray-500">Select one of the menu items to try</p>
            </div>
        </>
    )
}

export default Home