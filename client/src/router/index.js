import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute.js"
import NotFoundPage from "../pages/NotFoundPage.js"
import IndexPage from "../pages/IndexPage.js"
import LoginPage from "../pages/LoginPage.js"
import ProfilePage from "../pages/ProfilePage.js"
import CreateCompetitionPage from "../pages/CreateCompetitionPage.js"

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    <LoginPage/>
                </Route>

                <ProtectedRoute path="/profile">
                    <ProfilePage/>
                </ProtectedRoute>

                <ProtectedRoute path="/create-competition">
                    <CreateCompetitionPage/>
                </ProtectedRoute>
                
                <Route path="/" exact>
                    <IndexPage/>
                </Route>

                <Route path="*">
                    <NotFoundPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router