import React from "react"
import { Link } from "react-router-dom"
import { Typography, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import DarkModeSwitch from "./DarkModeSwitch.js"
import Avatar from "../User/Avatar.js"

const useStyles = makeStyles(theme => ({
    header: {
        margin: `${theme.spacing(4)}px 0`
    }
}))

function Header() {
    const classes = useStyles()

    return (
        <Grid container className={classes.header} alignItems="center">
            <Grid item xs={2}>
                <DarkModeSwitch />
            </Grid>

            <Grid item xs={8} container direction="column" justify="center" alignItems="center">
                <Grid item>
                    <Link to="/">
                        <Typography variant="h4">Competition Platform</Typography>
                    </Link>
                </Grid>

                <Grid item container justify="center">
                    <Link to="/">
                        <Typography variant="subtitle1">Competitions</Typography>
                    </Link>
                </Grid>
            </Grid>

            <Grid item xs={2} container justify="flex-end">
                <Avatar className={classes.avatar} />
            </Grid>
        </Grid>
    )
}

export default Header