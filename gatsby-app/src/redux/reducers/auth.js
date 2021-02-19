import {
    LOGIN_USER
} from "../types"

const initialState = {
    user: {
        username: null,
        token: null,
        refreshToken: null
    },
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: {
                    username: action.payload.username,
                    token: action.payload.token,
                    refreshToken: action.payload.refreshToken,
                }                
            }
        default:
            return state
    }
}