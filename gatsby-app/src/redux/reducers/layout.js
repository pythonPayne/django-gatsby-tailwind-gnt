import {
    TOGGLE_THEME, SHOW_MENU
} from "../types"

const initialState = {
    theme: "light",
    showingMenu: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                theme: action.payload === "dark" ? "light" : "dark"
            }
        case SHOW_MENU:
            return {
                ...state,
                showingMenu: action.payload
            }
        default:
            return state
    }
}
