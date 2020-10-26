import React from "react"
import { useParams, Redirect, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { CircularProgress, Typography, Divider, Button, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MDEditor from "@uiw/react-md-editor"

import Layout from "../components/Layout/Layout.js"
import Submissions from "../components/Competition/Submissions.js"
import useAPIData from "../utils/useAPIData.js"

const useStyles = makeStyles(theme => ({
    header: {
        display: "flex",
        justifyContent: "space-between"
    },

    dates: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        color: theme.palette.text.secondary
    },

    divider: {
        margin: `${theme.spacing(4)}px 0`
    },

    title: {
        marginBottom: theme.spacing(2)
    },

    spacingBottom: {
        marginBottom: theme.spacing(4)
    }
}))

function CompetitionPage() {
    const { id } = useParams()

    const classes = useStyles()

    const isLoggedIn = useSelector(store => store.auth.isLoggedIn)
    const user = useSelector(store => store.auth.user)

    const { isLoading, data, error } = useAPIData({
        method: "getCompetition",
        data: id,
        useCache: false
    })

    if (error?.response.status === 404) {
        return <Redirect to="/404"/>
    }

    if (!data) {
        return <Layout/>
    }

    return (
        <Layout>
            { isLoading ? <CircularProgress/> : (
                <>
                    { isLoggedIn && data.user.id === user.id && (
                        <Grid container justify="flex-end" className={classes.spacingBottom}>
                            <Link to={"/edit-competition/" + id}>
                                <Button variant="contained">Edit Competition</Button>
                            </Link>
                        </Grid>
                    )}
                        

                    <div className={classes.header}>
                        <Typography variant="h4">{ data.title }</Typography>

                        <div className={classes.dates}>
                            <Typography variant="subtitle1">Started { data.created_at.fromNow() }</Typography>

                            { data.end_at && (
                                <Typography variant="subtitle1">End: { data.end_at.format("DD.MM.YYYY HH:mm") }</Typography>
                            ) }
                        </div>
                    </div>

                    <Divider className={classes.divider}/>

                    <MDEditor.Markdown source={data.briefing_text}/>

                    <Divider className={classes.divider}/>

                    { isLoggedIn && !data.hasSubmitted && (
                        <Link to={`/competition/${id}/submit`}>
                            <Button variant="contained" color="primary" className={classes.spacingBottom}>Submit A Project</Button>
                        </Link>
                    ) }

                    <Typography variant="h4" className={classes.title}>Submissions</Typography>

                    <Submissions competitionId={id}/>
                </>
            )}
        </Layout>
    )
}

export default CompetitionPage