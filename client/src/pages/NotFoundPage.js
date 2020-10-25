import React from "react"
import { Typography } from "@material-ui/core"

import Layout from "../components/Layout/Layout.js"
import sadGarry from "../assets/images/sad_garry.webp"

function NotFoundPage() {
    return (
        <Layout>
            <Typography variant="h4" gutterBottom>404</Typography>

            <img src={sadGarry} alt=""/>
        </Layout>
    )
}

export default NotFoundPage