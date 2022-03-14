import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="bg-white h-[100px] fixed top-0 inset-x-0 px-10 py-3">
            <div className="mx-auto max-w-screen-lg flex flex-col justify-between h-full">
                <h1 className="font-bold text-xl">SCA</h1>
                <nav className="flex space-x-5">
                    <Link to="/">Home</Link>
                    <Link to="/contacts">Contacts</Link>
                </nav>
            </div>

        </header>
    )
}

const MainLayout = (props) => {
    const { children } = props

    return (
        <div className="min-h-full bg-gray-200 pt-[120px] pb-[20px] px-10">
            <Header />
            <main className="bg-white mx-auto w-full max-w-screen-lg p-7 rounded-xl">
                {children}
            </main>
        </div>
    )
}

const MainHeader = ({ title, withAction, actionText, actionTo }) => (
    <div className="flex justify-between items-center mb-5">
        <h2 className="font-semibold text-2xl">{title}</h2>

        {withAction && <Link to={actionTo} className="btn black">{actionText}</Link>}
    </div>
)

MainLayout.MainHeader = MainHeader
MainLayout.MainHeader.defaultProps = {
    withAction: true,
}

export default MainLayout