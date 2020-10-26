import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import Competitions from "../components/Competition/Competitions.js"

const useStyles = makeStyles(theme => ({
    spacingBottom: {
        marginBottom: theme.spacing(4)
    }
}))

function IndexPage() {
    const classes = useStyles()

    const isLoggedIn = useSelector(store => store.auth.isLoggedIn)

    return (
        <Layout>
            { isLoggedIn && (
                <Link to="/create-competition">
                    <Button variant="contained" color="primary" className={classes.spacingBottom}>Create Competition</Button>
                </Link>
            )}

            <Competitions/>
        </Layout>
    )
}

export default IndexPage