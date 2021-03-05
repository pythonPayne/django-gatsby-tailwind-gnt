import {
    LOGIN_USER,
    LOGOUT_USER,
    REFRESH_USER
} from "../types"

export const loginUser = ({username, token, refreshToken}) => {
    return ({
        type: LOGIN_USER,
        payload: {
            username,
            token,
            refreshToken
        }
    })
}

export const refreshUser = ({username, token, refreshToken, exp, origIat}) => {
    localStorage.setItem("token", token)
    localStorage.setItem("refreshToken", refreshToken)
    localStorage.setItem("exp", exp)
    return ({
        type: REFRESH_USER,
        payload: {
            username, token, refreshToken, exp, origIat
        }
    })
}

export const logoutUser = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("exp")    
    return ({
        type: LOGOUT_USER,
        payload: null
    })
}