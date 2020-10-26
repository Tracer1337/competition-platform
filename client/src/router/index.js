import React from "react"
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute.js"
import NotFoundPage from "../pages/NotFoundPage.js"
import IndexPage from "../pages/IndexPage.js"
import LoginPage from "../pages/LoginPage.js"
import ProfilePage from "../pages/ProfilePage.js"
import CreateCompetitionPage from "../pages/CreateCompetitionPage.js"
import CompetitionPage from "../pages/CompetitionPage.js"
import ProjectPage from "../pages/ProjectPage.js"
import CreateProjectPage from "../pages/CreateProjectPage.js"

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
                
                <Route path="/competition/:id/submit">
                    <CreateProjectPage/>
                </Route>

                <Route path="/project/:id">
                    <ProjectPage/>
                </Route>

                <Route path="/competition/:id">
                    <CompetitionPage/>
                </Route>

                <Route path="/" exact>
                    <IndexPage/>
                </Route>

                <Route path="/404">
                    <NotFoundPage/>
                </Route>

                <Route path="*">
                    <Redirect to="/404"/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router