import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme, showMenu } from '../redux/actions/layout'
import Menu from "../components/Menu"

const Layout = ({ children }) => {    
    const theme = useSelector((state) => state.layout.theme)
    const showingMenu = useSelector((state) => state.layout.showingMenu)    
    const dark = theme === "dark"
    const dispatch = useDispatch()
        
    const menu = "M4 8h16M4 16h16"
    const sun = "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    const moon = "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    const x = "M6 18L18 6M6 6l12 12"
    const code ="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    
    return (
        <>
            <div
                className={`h-10 w-full px-2 bg-gray-50 text-green-400 text-xl border-b flex justify-between items-center fixed top-0
                ${dark && "bg-gray-900 border-none"}`}>
                
                <svg className={`w-6 h-6 text-gray-900 stroke-current stroke-2
                    ${dark && "text-green-400"}`} 
                    fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={code} />
                </svg>
                
                <svg className={`w-6 h-6 stroke-current stroke-2 text-opacity-50 ${dark ? "text-yellow-500 text-opacity-100" : "text-gray-900"}`}
                    fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    onClick={() => dispatch(toggleTheme(theme))}><path strokeLinecap="round" strokeLinejoin="round" d={dark ? sun : moon} />                 
                </svg>                
            </div>
            <div className={`mt-10 bg-gray-50 ${dark && "bg-gray-800"}`} style={{height: "calc(100vh - 2.5rem)"}}>{children}</div>
            {/* <div className={`h-10 w-full px-2 bg-gray-50 text-green-400 text-xl border-t flex justify-end items-center fixed bottom-0 z-10
                ${dark && "bg-gray-900 border-none"}`}
            >                 */}
            
            <svg className={`w-8 h-8 text-gray-900 stroke-current stroke-2 fixed bottom-20 right-5 z-10
                ${dark && "text-green-400"}`} 
                onClick={() => dispatch(showMenu(!showingMenu))}
                fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showingMenu ? x : menu} />
            </svg>
        
            {/* </div> */}

            {/* MENU overlay */}
            {showingMenu && <Menu dark={dark}/>}
            

        </>
    )
}

export default Layout

