import React, { useState } from "react"
import { useParams, Redirect, Link, useHistory } from "react-router-dom"
import { CircularProgress, Typography, Divider, Button, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MDEditor from "@uiw/react-md-editor"

import Layout from "../components/Layout/Layout.js"
import Submissions from "../components/Competition/Submissions.js"
import EndDate from "../components/Competition/EndDate.js"
import ErrorLoadingButton from "../components/Styled/ErrorLoadingButton.js"
import Auth from "../components/User/Auth.js"
import useAPIData from "../utils/useAPIData.js"
import { deleteCompetition } from "../config/api.js"
import { opener } from "../components/ComponentOpener/ComponentOpener.js"

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
    },

    spacingRight: {
        marginRight: theme.spacing(2)
    }
}))

function CompetitionPage() {
    const { id } = useParams()

    const classes = useStyles()

    const history = useHistory()

    const [isDeleting, setIsDeleting] = useState(false)

    const { isLoading, data, error } = useAPIData({
        method: "getCompetition",
        data: id,
        useCache: false
    })

    const handleDelete = () => {
        const dialog = opener.openDialog("Confirm", { content: "This competition including all submissions will be deleted and cannot be restored." })

        dialog.addEventListener("close", (shouldDelete) => {
            if (shouldDelete) {
                setIsDeleting(true)

                deleteCompetition(id)
                    .then(() => history.push("/"))
                    .then(() => setIsDeleting(false))
            }
        })
    }

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
                    <Auth roles={["Moderator"]} userId={data.user.id}>
                        <Grid container justify="flex-end" className={classes.spacingBottom}>
                            <Link to={"/edit-competition/" + id}>
                                <Button variant="contained" className={classes.spacingRight}>Edit Competition</Button>
                            </Link>

                            <ErrorLoadingButton onClick={handleDelete} isLoading={isDeleting}>Delete Competition</ErrorLoadingButton>
                        </Grid>
                    </Auth>
                        

                    <div className={classes.header}>
                        <Typography variant="h4">{ data.title }</Typography>

                        <div className={classes.dates}>
                            <Typography variant="subtitle1">Started { data.created_at.fromNow() }</Typography>

                            <Typography variant="subtitle1">
                                <EndDate data={data}/>
                            </Typography>
                        </div>
                    </div>

                    <Divider className={classes.divider}/>

                    <MDEditor.Markdown source={data.briefing_text}/>

                    <Divider className={classes.divider}/>

                    <Auth roles={["User", "Moderator"]}>
                        { !data.hasSubmitted && data.state === "open" && (
                            <Link to={`/competition/${id}/submit`}>
                                <Button variant="contained" color="primary" className={classes.spacingBottom}>Submit A Project</Button>
                            </Link>
                        ) }
                    </Auth>

                    <Typography variant="h4" className={classes.title}>Submissions</Typography>

                    <Submissions competitionId={id}/>
                </>
            )}
        </Layout>
    )
}

export default CompetitionPage