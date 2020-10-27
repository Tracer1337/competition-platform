import React from "react"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { Paper, Typography, Grid, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Avatar from "../User/Avatar.js"
import Username from "../User/Username.js"

const useStyles = makeStyles(theme => ({
    winner: {
        padding: theme.spacing(2)
    },

    spacingRight: {
        marginRight: theme.spacing(1)
    }
}))

function Winner({ className, data }) {
    const classes = useStyles()
    
    return (
        <Paper className={clsx(className, classes.winner)} key={data.id}>
            <Grid container alignItems="center">
                <Grid item xs container>
                    <Typography variant="h6" className={classes.spacingRight}>Winner:</Typography>

                    <Avatar user={data.user} size={28} className={classes.spacingRight} />

                    <Typography variant="h6" className={classes.spacingRight}>
                        <Username user={data.user} />
                    </Typography>
                </Grid>

                <Grid item xs container justify="flex-end">
                    <Link to={"/project/" + data.id}>
                        <Button>
                            View Project
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Winner