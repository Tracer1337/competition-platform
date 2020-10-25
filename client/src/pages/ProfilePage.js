import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core"

import Layout from "../components/Layout/Layout.js"
import { logout } from "../store/actions.js"

function ProfilePage() {
    const dispatch = useDispatch()

    return (
        <Layout>
            <Button variant="contained" onClick={() => dispatch(logout())}>Logout</Button>
        </Layout>
    )
}

export default ProfilePage