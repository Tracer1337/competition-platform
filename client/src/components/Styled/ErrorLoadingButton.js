import React from "react"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core"
import { red } from "@material-ui/core/colors"

import LoadingButton from "./LoadingButton.js"

const redTheme = createMuiTheme({
    palette: {
        primary: red
    }
})

function ErrorButton({ children, ...props }) {
    return (
        <MuiThemeProvider theme={redTheme}>
            <LoadingButton variant="contained" color="primary" {...props}>{ children }</LoadingButton>
        </MuiThemeProvider>
    )
}

export default ErrorButton