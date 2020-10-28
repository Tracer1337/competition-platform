import { SET_DARK_MODE } from "../actionTypes.js"

const initialState = {
    isDarkMode: false
}

function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DARK_MODE:
            return {
                ...state,
                isDarkMode: action.isDarkMode
            }
            
        default:
            return state
    }
}

export default settingsReducer