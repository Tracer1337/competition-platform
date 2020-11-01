import React from "react"
import { CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Project from "../Project/Project.js"
import useAPIData from "../../utils/useAPIData.js"

const useStyles = makeStyles(theme => ({
    submission: {
        marginBottom: theme.spacing(2)
    }
}))

function Submissions({ competitionId }) {
    const classes = useStyles()
    
    const { isLoading, data } = useAPIData({
        method: "getSubmissions",
        data: competitionId,
        useCache: false
    })

    if (isLoading) {
        return <CircularProgress/>
    }

    return data.map(project => (
        <Project
            key={project.id}
            data={project}
            className={classes.submission}
        />
    ))
}

export default Submissions