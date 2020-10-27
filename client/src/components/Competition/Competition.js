import React from "react"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { Paper, Typography, Divider} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MDEditor from "@uiw/react-md-editor"

import EndDate from "./EndDate.js"
import Winner from "./Winner.js"

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2)
    },

    competition: {
        "&:hover": {
            boxShadow: theme.shadows[5]
        }
    },

    winner: {
        marginTop: theme.spacing(1)
    },

    header: {
        display: "flex",
        justifyContent: "space-between"
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

    const hasEnded = data.state === "ended"

    return (
        <div className={className}>
            <Link to={"/competition/" + data.id}>
                <Paper className={clsx(classes.paper, classes.competition)}>
                    <div className={classes.header}>
                        <Typography variant="h6">{data.title}</Typography>

                        <Typography variant="subtitle1">
                            <EndDate data={data}/>
                        </Typography>
                    </div>

                    <Divider className={classes.divider}/>

                    <div className={classes.briefingWrapper}>
                        <MDEditor.Markdown source={data.briefing_text}/>
                    </div>
                </Paper>
            </Link>

            {hasEnded && (
                data.winner_projects.length ? data.winner_projects.map(project => (
                    <Winner data={project} className={classes.winner}/>
                )) : (
                    <Typography variant="h6">No Winner</Typography>
                )
            ) }
        </div>
    )
}

export default Competition