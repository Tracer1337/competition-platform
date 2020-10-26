import React from "react"
import { useParams } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"

import Layout from "../components/Layout/Layout.js"
import ProjectForm from "../components/Forms/ProjectForm.js"
import useAPIData from "../utils/useAPIData.js"
import { editProject } from "../config/api.js"

function EditProjectPage() {
    const { id } = useParams()

    const { isLoading, data, reload } = useAPIData({
        method: "getProject",
        data: id,
        useCache: false
    })

    if (isLoading) {
        return <Layout><CircularProgress /></Layout>
    }

    if (!data) {
        return <Layout/>
    }

    return (
        <Layout>
            <ProjectForm
                isEditMode
                data={data}
                competitionId={data.competition.id}
                apiMethod={editProject.bind(null, id)}
                onReload={reload}
            />
        </Layout>
    )
}

export default EditProjectPage