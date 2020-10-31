import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import Competitions from "../components/Competition/Competitions.js"
import Auth from "../components/User/Auth.js"

const useStyles = makeStyles(theme => ({
    spacingBottom: {
        marginBottom: theme.spacing(4)
    }
}))

function IndexPage() {
    const classes = useStyles()

    return (
        <Layout>
            <Auth roles={["Moderator"]}>
                <Link to="/create-competition">
                    <Button variant="contained" color="primary" className={classes.spacingBottom}>Create Competition</Button>
                </Link>
            </Auth>

            <Competitions/>
        </Layout>
    )
}

export default IndexPage