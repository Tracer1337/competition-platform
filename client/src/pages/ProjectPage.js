import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useParams, Redirect } from "react-router-dom"
import { CircularProgress, Typography, Divider, Grid, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MDEditor from "@uiw/react-md-editor"

import Layout from "../components/Layout/Layout.js"
import Avatar from "../components/User/Avatar.js"
import Auth from "../components/User/Auth.js"
import Username from "../components/User/Username.js"
import VoteButton from "../components/Project/VoteButton.js"
import OpenProjectButton from "../components/Project/OpenProjectButton.js"
import ErrorLoadingButton from "../components/Styled/ErrorLoadingButton.js"
import useAPIData from "../utils/useAPIData.js"
import { deleteProject } from "../config/api.js"
import { getFileExtension } from "../utils"
import { opener } from "../components/ComponentOpener/ComponentOpener.js"

const useStyles = makeStyles(theme => ({
    avatar: {
        marginRight: theme.spacing(2)
    },

    competition: {
        marginTop: theme.spacing(2)
    },

    spacingBottom: {
        marginBottom: theme.spacing(2)
    },

    spacingRight: {
        marginRight: theme.spacing(2)
    },

    divider: {
        margin: `${theme.spacing(4)}px 0`
    },

    image: {
        width: "80%",
        marginBottom: theme.spacing(2),
        boxShadow: theme.shadows[3],
        borderRadius: theme.shape.borderRadius
    }
}))

function ProjectPage() {
    const { id } = useParams()

    const classes = useStyles()

    const history = useHistory()

    const [isDeleting, setIsDeleting] = useState(false)

    const { isLoading, data, error } = useAPIData({
        method: "getProject",
        data: id, 
        useCache: false
    })

    const handleDelete = () => {
        const dialog = opener.openDialog("Confirm", { content: "The project will be deleted and cannot be restored." })

        dialog.addEventListener("close", (shouldDelete) => {
            if (shouldDelete) {
                setIsDeleting(true)

                deleteProject(id)
                    .then(() => history.goBack())
                    .finally(() => setIsDeleting(false))
            }
        })
    }

    if (error?.response.status === 404) {
        return <Redirect to="/404"/>
    }

    if (!data) {
        return <Layout />
    }

    return ( 
        <Layout>
            { isLoading ? <CircularProgress /> : (
                <>
                    <Grid container justify="flex-end" className={classes.spacingBottom}>
                        <Auth roles={["User", "Moderator"]} userId={data.user.id}>
                            <Link to={"/edit-project/" + id}>
                                <Button variant="contained" className={classes.spacingRight}>Edit Project</Button>
                            </Link>
                        </Auth>

                        <Auth shouldRender={user => user.role.name === "Moderator" || data.user.id === user.id}>
                            <ErrorLoadingButton onClick={handleDelete} isLoading={isDeleting}>Delete Project</ErrorLoadingButton>
                        </Auth>
                    </Grid>

                    <Grid container>
                        <Grid item xs container alignItems="center">
                            <Avatar user={data.user} className={classes.avatar}/>

                            <Typography variant="h5">
                                <Username user={data.user}/>
                            </Typography>
                        </Grid>

                        <Grid item xs container justify="flex-end">
                            <OpenProjectButton project={data} variant="contained" className={classes.spacingRight}/>

                            <a href={data.file_url} download={data.user.username + getFileExtension(data.filename)}>
                                <Button variant="contained" color="primary">
                                    Download Project
                                </Button>
                            </a>
                        </Grid>
                    </Grid>
                    
                    <Grid className={classes.competition} container>
                        <Grid item xs>
                            <VoteButton project={data} extended/>
                        </Grid>

                        <Grid item xs container justify="flex-end">
                            <Link to={"/competition/" + data.competition_id}>
                                <Button variant="outlined">View Competition</Button>
                            </Link>
                        </Grid>
                    </Grid>

                    <Divider className={classes.divider}/>

                    <MDEditor.Markdown source={data.description}/>

                    <Divider className={classes.divider}/>

                    <Grid container direction="column" alignItems="center">
                        { data.images.map(image => (
                            <img key={image.id} src={image.url} alt="" className={classes.image}/>
                        )) }
                    </Grid>
                </>
            )}
        </Layout>
    )
}

export default ProjectPage