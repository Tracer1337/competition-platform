import React from "react"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { Paper, Typography, Grid, Button, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import EditIcon from "@material-ui/icons/Edit"

import Avatar from "../User/Avatar.js"
import Username from "../User/Username.js"
import Auth from "../User/Auth.js"
import Image from "./Image.js"
import VoteButton from "./VoteButton.js"
import OpenProjectButton from "./OpenProjectButton.js"

const useStyles = makeStyles(theme => ({
    project: {
        padding: theme.spacing(2)
    },

    spacingBottom: {
        marginBottom: theme.spacing(2)
    },

    avatar: {
        marginRight: theme.spacing(1)
    },

    image: {
        height: 100,
        marginRight: theme.spacing(1),
    },

    spacingRight: {
        marginRight: theme.spacing(2)
    }
}))

function Project({ className, data }) {
    const classes = useStyles()

    return (
        <Paper className={clsx(className, classes.project)}>
            <Grid container className={classes.spacingBottom}>
                <Grid item xs container alignItems="center">
                    <Avatar user={data.user} size={28} className={classes.avatar}/>
                    <Typography variant="subtitle1"><Username user={data.user}/></Typography>
                </Grid>

                <Grid item xs container justify="flex-end">
                    <Auth roles={["User", "Moderator"]} userId={data.user.id}>
                        <Link to={"/edit-project/" + data.id}>
                            <IconButton size="small">
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </Auth>
                </Grid>
            </Grid>

            <Grid container className={classes.spacingBottom}>
                { data.images.map(image => (
                    <Grid item key={image.id}>
                        <Image data={image} className={classes.image}/>
                    </Grid>
                )) }
            </Grid>

            <Grid container>
                <Link to={"/project/" + data.id}>
                    <Button variant="outlined" color="primary" className={classes.spacingRight}>
                        View Project
                    </Button>
                </Link>

                <OpenProjectButton project={data} className={classes.spacingRight} />

                <VoteButton project={data} />
            </Grid>
        </Paper>
    )
}

export default Project