import {
    TOGGLE_THEME, SHOW_MENU
} from "../types"

export const toggleTheme = (theme) => ({type: TOGGLE_THEME, payload: theme})
export const showMenu = (b) => ({type: SHOW_MENU, payload: b})
    
