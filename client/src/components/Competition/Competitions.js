import React from "react"
import { CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Competition from "./Competition.js"
import useAPIData from "../../utils/useAPIData.js"

const useStyles = makeStyles(theme => ({
    entry: {
        marginBottom: theme.spacing(2)
    }
}))

function Competitions() {
    const classes = useStyles()

    const { isLoading, data } = useAPIData({
        method: "getAllCompetitions",
        useCache: false
    })

    if (isLoading || !data) {
        return <CircularProgress/>
    }

    return data.map(entry => (
        <Competition data={entry} className={classes.entry} key={entry.id}/>
    ))
}

export default Competitions