import React from "react"
import { useParams } from "react-router-dom"

import Layout from "../components/Layout/Layout.js"
import ProjectForm from "../components/Forms/ProjectForm.js"
import { createProject } from "../config/api.js"

function CreateProjectPage() {
    const { id } = useParams()

    return (
        <Layout>
            <ProjectForm apiMethod={createProject} competitionId={id}/>
        </Layout>
    )
}

export default CreateProjectPage