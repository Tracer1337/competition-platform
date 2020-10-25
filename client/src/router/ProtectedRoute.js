import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

function ProtectedRoute({ children }) {
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Redirect to="/login"/>
    }

    return children
}

export default ProtectedRoute