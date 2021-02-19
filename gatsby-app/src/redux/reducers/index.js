import { combineReducers } from "redux"
import layout from './layout'
import auth from './auth'

export default combineReducers({
    layout,
    auth,
})