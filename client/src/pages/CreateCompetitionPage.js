import React from "react"

import Layout from "../components/Layout/Layout.js"
import CompetitionForm from "../components/Forms/CompetitionForm.js"
import { createCompetition } from "../config/api.js"

function CreateCompetitionPage() {
    return (
        <Layout>
            <CompetitionForm apiMethod={createCompetition}/>
        </Layout>
    )
}

export default CreateCompetitionPage