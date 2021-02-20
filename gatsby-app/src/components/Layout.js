import React from 'react'
import { Link } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/actions/layout'

const Layout = ({ children }) => {
    const theme = useSelector((state) => state.layout.theme)
    const dark = theme === "dark"
    const dispatch = useDispatch()
    const menu = "M4 6h16M4 12h16M4 18h16"
    const sun = "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    const moon = "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    
    return (
        <>
            <div
                className={
                `h-10 w-full px-2 bg-gray-200 text-green-400 text-xl
                flex justify-between items-center
                fixed top-0
                ${dark && "bg-gray-900"}`}
            >
                <Link to="/menu">
                <svg
                    className={
                    `w-6 h-6 text-gray-900 stroke-current stroke-2
                    ${dark && "text-green-400"}`} 
                    fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"                    
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menu} />
                </svg>
                </Link>
                <svg 
                    className={
                        `w-6 h-6 stroke-current stroke-2
                        ${dark ? "text-yellow-500" : "text-gray-900"}`}
                    fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    onClick={() => dispatch(toggleTheme(theme))}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d={dark ? sun : moon} />                 
                </svg>                
            </div>
            <div className={`mt-10 ${dark && "bg-gray-800"}`}
            style={{height: "calc(100vh - 5rem)"}}
            >{children}</div>
            <div 
                className={
                    `h-10 w-full px-2 bg-gray-200 text-green-400 text-xl
                    flex justify-between items-center
                    fixed bottom-0 z-10
                    ${dark && "bg-gray-900"}`}
            ></div>
        </>
    )
}

export default Layout

