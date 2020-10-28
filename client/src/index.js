import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"

import store from "./store"
import App from "./App.js"
import * as serviceWorker from "./serviceWorker.js"
import "./index.css"

ReactDOM.render(
    <Provider store={store}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <App />
        </MuiPickersUtilsProvider>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
