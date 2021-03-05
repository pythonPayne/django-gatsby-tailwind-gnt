import React from 'react'
import { navigate } from 'gatsby'
import { logoutUser } from "../redux/actions/auth"
import { useDispatch } from "react-redux"
import RefreshUserToken from '../services/refreshUserToken'

const Private = ({ component: Component, location, ...rest }) => {
    const dispatch = useDispatch()
    const refreshToken = localStorage.getItem("refreshToken")
    const timeToExp = (1000*localStorage.getItem("exp") - (new Date().getTime()))
    const loggedIn = timeToExp > 0
    
    console.log(timeToExp/1000, " seconds until token expires")
    console.log("logged in? ", loggedIn)

    if(loggedIn) {return <Component {...rest} />}
    if(!loggedIn && refreshToken==null) {
        dispatch(logoutUser())
        navigate("/app/login")
        return null
    }    

    if(!loggedIn && refreshToken.length > 0){
        return <RefreshUserToken refreshToken={refreshToken} path={location.pathname}/>
    }
}

export default Private
