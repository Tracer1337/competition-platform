import React from "react"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { Paper, Typography, Grid, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Avatar from "../User/Avatar.js"
import Username from "../User/Username.js"
import Image from "./Image.js"
import VoteButton from "./VoteButton.js"

const useStyles = makeStyles(theme => ({
    project: {
        padding: theme.spacing(2)
    },

    header: {
        display: "flex",
        alignItems: "center"
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

    viewButton: {
        marginRight: theme.spacing(2)
    }
}))

function Project({ className, data }) {
    const classes = useStyles()

    return (
        <Paper className={clsx(className, classes.project)}>
            <div className={clsx(classes.header, classes.spacingBottom)}>
                <Avatar user={data.user} size={28} className={classes.avatar}/>
                <Typography variant="subtitle1"><Username user={data.user}/></Typography>
            </div>

            <Grid container className={classes.spacingBottom}>
                { data.images.map(image => (
                    <Grid item key={image.id}>
                        <Image data={image} className={classes.image}/>
                    </Grid>
                )) }
            </Grid>

            <Grid container>
                <Link to={"/project/" + data.id}>
                    <Button variant="outlined" className={classes.viewButton}>
                        View Project
                    </Button>
                </Link>

                <VoteButton project={data} />
            </Grid>
        </Paper>
    )
}

export default Project