import React from "react"
import { Paper, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => {
    const size = 42

    return {
        levelBarContainer: {
            display: "flex",
            alignItems: "center"
        },

        levelBar: {
            height: size / 3,
            borderRadius: size / 3,
            flexGrow: 1,
            margin: `0 ${-size}px`
        },

        progress: {
            backgroundColor: theme.palette.primary.main,
            height: "100%",
            borderRadius: size / 3
        },

        level: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.getContrastText(theme.palette.background.paper),
            borderRadius: "50%",
            width: size,
            height: size,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            border: `1px solid ${theme.palette.action.disabledBackground}`
        }
    }
})

function LevelBar({ user, className }) {
    const classes = useStyles()

    const progress = (user.pointsDone / user.pointsRequired) * 100

    return (
        <div className={className}>
            <Typography gutterBottom>{user.pointsDone} of {user.pointsRequired} Exp</Typography>

            <div className={classes.levelBarContainer}>
                <div className={classes.level}>{user.level}</div>

                <Paper className={classes.levelBar} variant="outlined">
                    <div className={classes.progress} style={{ width: progress + "%" }}/>
                </Paper>

                <div className={classes.level}>{user.level + 1}</div>
            </div>
        </div>
    )
}

export default LevelBar