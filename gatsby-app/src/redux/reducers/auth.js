import {
    LOGIN_USER, 
    LOGOUT_USER, 
    REFRESH_USER
} from "../types"

const initialState = {
    username: null,
    token: null,
    refreshToken: null,
    exp: null,
    origIat: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
            }                
        case REFRESH_USER:
            return {
                username: action.payload.username,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                exp: action.payload.exp,
                origIat: action.payload.origIat
            }
        case LOGOUT_USER:
            return initialState
        default:
            return state
    }
}