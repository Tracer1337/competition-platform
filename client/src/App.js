import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { CssBaseline, CircularProgress, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Router from "./router/index.js"
import { login } from "./store/actions.js"
import { getProfile } from "./config/api.js"

const useStyles = makeStyles(theme => ({
    "@global": {
        a: {
            textDecoration: "none",
            color: theme.palette.text.primary
        }
    }
}))

const shouldLogin = !!localStorage.getItem("token")

function App() {
    useStyles()

    const dispatch = useDispatch()

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

    if (isLoading) {
        return (
            <div>
                <Typography>Logging in...</Typography>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            <CssBaseline/>

            <Router/>
        </div>
    )
}

export default App