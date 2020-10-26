import React from "react"
import { Route } from "react-router-dom"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

function ProtectedRoute({ children, ...props }) {
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Redirect to="/login"/>
    }

    return (
        <Route {...props}>
            { children }
        </Route>
    )
}

export default ProtectedRoute