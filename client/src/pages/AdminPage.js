import React from "react"
import { Typography } from "@material-ui/core"

import Layout from "../components/Layout/Layout.js"
import UserManager from "../components/UserManager/UserManager.js"

function AdminPage() {
    return (
        <Layout>
            <Typography variant="h4" gutterBottom>Users</Typography>
            <UserManager/>
        </Layout>
    )
}

export default AdminPage