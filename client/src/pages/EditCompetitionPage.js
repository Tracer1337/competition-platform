import React from "react"
import { useParams } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"

import Layout from "../components/Layout/Layout.js"
import CompetitionForm from "../components/Forms/CompetitionForm.js"
import useAPIData from "../utils/useAPIData.js"
import { editCompetition } from "../config/api.js"

function EditCompetitionPage() {
    const { id } = useParams()

    const { isLoading, data } = useAPIData({
        method: "getCompetition",
        data: id,
        useCache: false
    })

    if (isLoading) {
        return <Layout><CircularProgress/></Layout>
    }

    return (
        <Layout>
            <CompetitionForm isEditMode data={data} apiMethod={editCompetition.bind(null, id)}/>
        </Layout>
    )
}

export default EditCompetitionPage