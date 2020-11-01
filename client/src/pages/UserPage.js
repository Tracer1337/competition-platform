import React from "react"
import { useParams } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import Profile from "../components/User/Profile.js"
import LevelBar from "../components/User/LevelBar.js"
import useAPIData from "../utils/useAPIData.js"

const useStyles = makeStyles(theme => ({
    spacingBottom: {
        marginBottom: theme.spacing(4)
    }
}))

function UserPage() {
    const { id } = useParams()

    const classes = useStyles()

    const { isLoading, data } = useAPIData({
        method: "getUser",
        data: id
    })

    if (isLoading) {
        return <Layout><CircularProgress/></Layout>
    }

    return (
        <Layout>
            <Profile user={data} className={classes.spacingBottom}/>

            <LevelBar user={data} className={classes.spacingBottom}/>
        </Layout>
    )
}

export default UserPage