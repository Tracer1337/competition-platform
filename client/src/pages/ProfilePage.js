import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button, Typography } from "@material-ui/core"

import Layout from "../components/Layout/Layout.js"
import { logout } from "../store/actions.js"

function ProfilePage() {
    const dispatch = useDispatch()

    const user = useSelector(store => store.auth.user)

    return (
        <Layout>
            <Typography>Logged in as: {user.fullUsername}</Typography>
            <Button variant="contained" onClick={() => dispatch(logout())}>Logout</Button>
        </Layout>
    )
}

export default ProfilePage