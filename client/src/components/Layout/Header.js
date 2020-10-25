import React from "react"
import { Link } from "react-router-dom"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Avatar from "../User/Avatar.js"

const useStyles = makeStyles(theme => ({
    header: {
        margin: `${theme.spacing(4)}px 0`,
        display: "flex",
        justifyContent: "space-between"
    },

    spacer: {
        width: 40
    },

    main: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    links: {
        display: "flex",
        justifyContent: "center"
    },

    avatar: {
        cursor: "pointer"
    }
}))

function Header() {
    const classes = useStyles()

    return (
        <div className={classes.header}>
            <div className={classes.spacer}/>

            <div className={classes.main}>
                <Link to="/">
                    <Typography variant="h4">Competition Platform</Typography>
                </Link>

                <div className={classes.links}>
                    <Link to="/">
                        <Typography variant="subtitle1">Competitions</Typography>
                    </Link>
                </div>
            </div>

            <div>
                <Avatar className={classes.avatar}/>
            </div>
        </div>
    )
}

export default Header