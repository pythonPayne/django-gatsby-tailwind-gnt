import React from 'react'
import { Link } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'
import { showMenu } from '../redux/actions/layout'
import RefreshUserToken from '../services/refreshUserToken'

const Menu = ({dark}) => {    
    const showingMenu = useSelector((state) => state.layout.showingMenu)
    const dispatch = useDispatch()
    const refreshToken = localStorage.getItem("refreshToken")
    const timeToExp = (1000*localStorage.getItem("exp") - (new Date().getTime()))
    const loggedIn = timeToExp > 0
    console.log(loggedIn)
    
    return (
        <div className={`${!dark && "bg-gray-100"} fixed left-0 top-0 w-2/3 h-screen z-10 pl-2 pt-2 text-2xl flex flex-col space-y-4
        ${dark && "bg-gray-900 text-gray-200"}`}>
            <div onClick={() => dispatch(showMenu(!showingMenu))}><Link to="/">Home</Link></div>
            <div onClick={() => dispatch(showMenu(!showingMenu))}><Link to="/about">About</Link></div>
            {loggedIn ?            
            <>
            <div onClick={() => dispatch(showMenu(!showingMenu))}><Link to="/app/logout">Logout</Link></div>
            <div onClick={() => dispatch(showMenu(!showingMenu))}><Link to="/app">Profile</Link></div>
            <div onClick={() => dispatch(showMenu(!showingMenu))}><Link to="/app/sermons">Sermons</Link></div>
            </>
            :
            <>
            <div onClick={() => dispatch(showMenu(!showingMenu))}><Link to="/app/login">Login</Link></div>
            <div onClick={() => dispatch(showMenu(!showingMenu))}><Link to="/app/register">Register</Link></div>
            </>
            }   
            {!loggedIn && refreshToken.length > 0 && <RefreshUserToken refreshToken={refreshToken} path={window.location.pathname}/>}
        </div>
    )
}

export default Menu
