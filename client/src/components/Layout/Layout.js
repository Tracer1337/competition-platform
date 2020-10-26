import React from "react"
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "./Header.js"

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: theme.spacing(8)
    }
}))

function Layout({ children }) {
    const classes = useStyles()

    return (
        <Container maxWidth="md" className={classes.container}>
            <Header/>

            { children }
        </Container>
    )
}

export default Layout