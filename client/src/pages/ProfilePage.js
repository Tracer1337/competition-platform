import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import Profile from "../components/User/Profile.js"
import LevelBar from "../components/User/LevelBar.js"
import { logout } from "../store/actions.js"

const useStyles = makeStyles(theme => ({
    spacingBottom: {
        marginBottom: theme.spacing(4)
    }
}))

function ProfilePage() {
    const classes = useStyles()

    const dispatch = useDispatch()

    const user = useSelector(store => store.auth.user)

    return (
        <Layout>
            <Profile user={user} className={classes.spacingBottom}/>

            <LevelBar user={user} className={classes.spacingBottom}/>

            <Button variant="contained" onClick={() => dispatch(logout())}>Logout</Button>
        </Layout>
    )
}

export default ProfilePage