import React from 'react'
import { Link } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/actions/layout'

const Layout = ({ children }) => {
    const theme = useSelector((state) => state.layout.theme)
    const dark = theme === "dark"
    const dispatch = useDispatch()

    return (
        <>
        <div className={`flex justify-between ${dark && "bg-gray-900 text-gray-100"}`}>
            <div className={`flex space-x-4`}>
                <div><Link to="/">Home</Link></div>
                <div><Link to="/about">About</Link></div>
            </div>
            <button                 
                className={`focus:outline-none`}
                onClick={() => dispatch(toggleTheme(theme))}>{dark ? "go light" : "go dark"}
            </button>
        </div>
        <div>
            {children}
        </div>
        </>
    )
}

export default Layout
