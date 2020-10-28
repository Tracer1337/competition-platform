import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Typography, Grid, Switch } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import LightIcon from "@material-ui/icons/Brightness5"
import DarkIcon from "@material-ui/icons/Brightness3"

import { setDarkMode } from "../../store/actions.js"

const useStyles = makeStyles(theme => ({
    iconWrapper: {
        width: "unset"
    }
}))

function DarkModeSwitch() {
    const classes = useStyles()

    const dispatch = useDispatch()

    const isDarkMode = useSelector(store => store.settings.isDarkMode)

    return (
        <Typography component="div">
            <Grid container component="label" alignItems="center">
                <Grid item container alignItems="center" className={classes.iconWrapper}>
                    <LightIcon fontSize="small"/>
                </Grid>

                <Grid item>
                    <Switch
                        className={classes.switch}
                        checked={isDarkMode}
                        onChange={event => dispatch(setDarkMode(event.target.checked))}
                    />
                </Grid>

                <Grid item container alignItems="center" className={classes.iconWrapper}>
                    <DarkIcon fontSize="small"/>
                </Grid>
            </Grid>
        </Typography>
    )
}

export default DarkModeSwitch