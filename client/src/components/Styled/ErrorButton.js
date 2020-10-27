import React from "react"
import { Button, MuiThemeProvider, createMuiTheme } from "@material-ui/core"
import { red } from "@material-ui/core/colors"

const redTheme = createMuiTheme({
    palette: {
        primary: red
    }
})

function ErrorButton({ ...props }) {
    return (
        <MuiThemeProvider theme={redTheme}>
            <Button variant="contained" color="primary" {...props}>Delete Project</Button>
        </MuiThemeProvider>
    )
}

export default ErrorButton