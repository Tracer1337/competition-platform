import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import CreateCompetitionForm from "../components/Forms/CreateCompetitionForm.js"

const useStyles = makeStyles(theme => ({

}))

function CreateCompetitionPage() {
    const classes = useStyles()

    return (
        <Layout>
            <CreateCompetitionForm/>
        </Layout>
    )
}

export default CreateCompetitionPage