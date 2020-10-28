import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    endAt: {
        color: theme.palette.success.main
    },

    ended: {
        color: theme.palette.error.main
    }
}))

function EndDate({ data }) {
    const classes = useStyles()

    if (!data.end_at) {
        return null
    }

    if (data.state === "ended") {
        return (
            <span className={classes.ended}>Ended {data.end_at.fromNow()}</span>
        )
    }

    return (
        <span className={classes.endAt}>End: {data.end_at.format("DD.MM.YYYY HH:mm")}</span>
    )
}

export default EndDate