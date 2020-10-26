import React from "react"
import { useParams, Redirect, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { CircularProgress, Typography, Divider, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MDEditor from "@uiw/react-md-editor"

import Layout from "../components/Layout/Layout.js"
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
        opacity: .87
    },

    divider: {
        margin: `${theme.spacing(4)}px 0`
    }
}))

function CompetitionPage() {
    const { id } = useParams()

    const classes = useStyles()

    const isLoggedIn = useSelector(store => store.auth.isLoggedIn)

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

                    { isLoggedIn && (
                        <Link to={`/competition/${id}/submit`}>
                            <Button variant="contained">Submit A Project</Button>
                        </Link>
                    ) }
                </>
            )}
        </Layout>
    )
}

export default CompetitionPage