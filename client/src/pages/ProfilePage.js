import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import Username from "../components/User/Username.js"
import { logout } from "../store/actions.js"

const useStyles = makeStyles(theme => ({
    spacingBottom: {
        marginBottom: theme.spacing(2)
    }
}))

function ProfilePage() {
    const classes = useStyles()

    const dispatch = useDispatch()

    const user = useSelector(store => store.auth.user)

    return (
        <Layout>
            <Typography className={classes.spacingBottom}>Logged in as: <Username user={user} notClickable/></Typography>
            <Button variant="contained" onClick={() => dispatch(logout())}>Logout</Button>
        </Layout>
    )
}

export default ProfilePage