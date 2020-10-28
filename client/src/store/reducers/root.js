import { combineReducers } from "redux"

import auth from "./auth.js"
import settings from "./settings.js"

const rootReducer = combineReducers({
    auth,
    settings
})

export default rootReducer