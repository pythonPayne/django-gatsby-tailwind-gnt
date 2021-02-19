import {
    LOGIN_USER
} from "../types"

export const loginUser = ({username, token, refreshToken}) => {
    
    return (
        {
            type: LOGIN_USER,
            payload: {
                username,
                token,
                refreshToken
            }
        }
    )
}