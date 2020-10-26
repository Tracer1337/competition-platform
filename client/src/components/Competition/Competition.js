import React from "react"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { Paper, Typography, Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MDEditor from "@uiw/react-md-editor"

const useStyles = makeStyles(theme => ({
    competition: {
        padding: theme.spacing(2),

        "&:hover": {
            boxShadow: theme.shadows[5]
        }
    },

    header: {
        display: "flex",
        justifyContent: "space-between"
    },

    endAt: {
        color: theme.palette.text.secondary
    },

    divider: {
        margin: `${theme.spacing(2)}px 0`
    },

    briefingWrapper: {
        maxHeight: 100,
        overflow: "hidden"
    }
}))

function Competition({ data, className }) {
    const classes = useStyles()

    return (
        <Link to={"/competition/" + data.id}>
            <Paper className={clsx(className, classes.competition)}>
                <div className={classes.header}>
                    <Typography variant="h6">{data.title}</Typography>

                    { data.end_at && (
                        <Typography variant="subtitle1" className={classes.endAt}>End: {data.end_at.format("DD.MM.YYYY HH:mm")}</Typography>
                    ) }
                </div>

                <Divider className={classes.divider}/>

                <div className={classes.briefingWrapper}>
                    <MDEditor.Markdown source={data.briefing_text}/>
                </div>
            </Paper>
        </Link>
    )
}

export default Competition