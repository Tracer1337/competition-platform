import React from "react"
import { useHistory } from "react-router-dom"

import Layout from "../components/Layout/Layout.js"
import LoginWithDiscord from "../components/Discord/LoginWithDiscord.js"

function LoginPage() {
    const history = useHistory()

    return (
        <Layout>
            <LoginWithDiscord onSuccess={() => history.push("/")}/>
        </Layout>
    )
}

export default LoginPage