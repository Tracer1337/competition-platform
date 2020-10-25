import React from "react"
import { Container } from "@material-ui/core"

import Header from "./Header.js"

function Layout({ children }) {
    return (
        <Container maxWidth="md">
            <Header/>

            { children }
        </Container>
    )
}

export default Layout