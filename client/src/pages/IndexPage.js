import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core"

import Layout from "../components/Layout/Layout.js"
import Competitions from "../components/Competition/Competitions.js"

function IndexPage() {
    return (
        <Layout>
            <Competitions/>

            <Link to="/create-competition">
                <Button variant="contained">Create Competition</Button>
            </Link>
        </Layout>
    )
}

export default IndexPage