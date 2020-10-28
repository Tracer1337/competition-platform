import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CssBaseline, CircularProgress, Typography, createMuiTheme, ThemeProvider  } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Router from "./router/index.js"
import { login } from "./store/actions.js"
import { getProfile } from "./config/api.js"

const lightTheme = createMuiTheme({
    palette: {
        type: "light"
    }
})

const darkTheme = createMuiTheme({
    palette: {
        type: "dark"
    }
})

const useStyles = makeStyles(theme => ({
    "@global": {
        a: {
            textDecoration: "none",
            color: theme.palette.text.primary
        }
    }
}))

const shouldLogin = !!localStorage.getItem("token")

function GlobalStyleRenderer() {
    useStyles()
    return null
}

function App() {
    const dispatch = useDispatch()

    const isDarkMode = useSelector(store => store.settings.isDarkMode)

    const theme = isDarkMode ? darkTheme : lightTheme

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            console.log(theme)
        }
    }, [theme])

    const [isLoading, setIsLoading] = useState(shouldLogin)

    useEffect(() => {
        if (shouldLogin) {
            getProfile()
                .then(res => dispatch(login({
                    token: localStorage.getItem("token"),
                    user: res.data
                })))
                .catch(() => {
                    localStorage.removeItem("token")
                })
                .finally(() => setIsLoading(false))
        }

        // eslint-disable-next-line
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyleRenderer/>

            { isLoading ? (
                <>
                    <Typography>Logging in...</Typography>
                    <CircularProgress />
                </>
            ) : (
                <Router />
            ) }
        </ThemeProvider>
    )
}

export default App