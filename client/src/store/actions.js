import { LOGIN, LOGOUT, SET_DARK_MODE } from "./actionTypes.js"

export function login({ token, user }) {
    return {
        type: LOGIN,
        token,
        user
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function setDarkMode(isDarkMode) {
    return {
        type: SET_DARK_MODE,
        isDarkMode
    }
}