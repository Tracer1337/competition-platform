import React from "react"
import { Link } from "react-router-dom"
import { useParams, Redirect } from "react-router-dom"
import { CircularProgress, Typography, Divider, Grid, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MDEditor from "@uiw/react-md-editor"

import Layout from "../components/Layout/Layout.js"
import Avatar from "../components/User/Avatar.js"
import Username from "../components/User/Username.js"
import useAPIData from "../utils/useAPIData.js"
import { getFileExtension } from "../utils"

const useStyles = makeStyles(theme => ({
    avatar: {
        marginRight: theme.spacing(2)
    },

    competition: {
        marginTop: theme.spacing(2)
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

    const { isLoading, data, error } = useAPIData({
        method: "getProject",
        data: id, 
        useCache: false
    })

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
                    <Grid container>
                        <Grid item xs container alignItems="center">
                            <Avatar user={data.user} className={classes.avatar}/>

                            <Typography variant="h5">
                                <Username user={data.user}/>
                            </Typography>
                        </Grid>

                        <Grid item xs container justify="flex-end">
                            <a href={data.file_url} download={data.user.username + getFileExtension(data.filename)}>
                                <Button variant="contained">
                                    Download Project
                                </Button>
                            </a>
                        </Grid>
                    </Grid>
                    
                    <Grid className={classes.competition} container justify="flex-end">
                        <Link to={"/competition/" + data.competition.id}>
                            <Button variant="outlined">{ data.competition.title }</Button>
                        </Link>
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