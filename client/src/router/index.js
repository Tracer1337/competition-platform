import React from "react"
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute.js"
import NotFoundPage from "../pages/NotFoundPage.js"
import IndexPage from "../pages/IndexPage.js"
import LoginPage from "../pages/LoginPage.js"
import ProfilePage from "../pages/ProfilePage.js"
import CompetitionPage from "../pages/CompetitionPage.js"
import ProjectPage from "../pages/ProjectPage.js"
import CreateCompetitionPage from "../pages/CreateCompetitionPage.js"
import EditCompetitionPage from "../pages/EditCompetitionPage.js"
import CreateProjectPage from "../pages/CreateProjectPage.js"
import EditProjectPage from "../pages/EditProjectPage.js"
import AdminPage from "../pages/AdminPage.js"
import UserPage from "../pages/UserPage.js"

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

                <ProtectedRoute path="/edit-competition/:id">
                    <EditCompetitionPage/>
                </ProtectedRoute>

                <ProtectedRoute path="/competition/:id/submit">
                    <CreateProjectPage/>
                </ProtectedRoute>
                
                <ProtectedRoute path="/edit-project/:id">
                    <EditProjectPage/>
                </ProtectedRoute>

                <ProtectedRoute path="/admin">
                    <AdminPage/>
                </ProtectedRoute>

                <Route path="/project/:id">
                    <ProjectPage/>
                </Route>

                <Route path="/competition/:id">
                    <CompetitionPage/>
                </Route>

                <Route path="/user/:id">
                    <UserPage/>
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