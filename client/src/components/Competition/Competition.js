import React from "react"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { Paper, Typography, Divider, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MDEditor from "@uiw/react-md-editor"

import EndDate from "./EndDate.js"
import Username from "../User/Username.js"

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

    divider: {
        margin: `${theme.spacing(2)}px 0`
    },

    briefingWrapper: {
        maxHeight: 100,
        overflow: "hidden"
    },

    spacingRight: {
        marginRight: theme.spacing(1)
    }
}))

function Competition({ data, className }) {
    const classes = useStyles()

    const hasEnded = data.state === "ended"

    return (
        <Link to={"/competition/" + data.id}>
            <Paper className={clsx(className, classes.competition)}>
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

                { hasEnded && (
                    <>
                        <Divider className={classes.divider}/>

                        <Grid container>
                            { data.winner_user ? (
                                <>
                                    <Typography variant="h6" className={classes.spacingRight}>Winner:</Typography>

                                    <Typography variant="h6">
                                        <Username user={data.winner_user} notClickable />
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="h6">No Winner</Typography>
                            )}
                        </Grid>
                    </>
                ) }
            </Paper>
        </Link>
    )
}

export default Competition