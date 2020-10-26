import React from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    username: {
        cursor: props => !props.notClickable && "pointer"
    },

    secondary: {
        color: theme.palette.text.secondary
    }
}))

function Username({ user, notClickable = false }) {
    const classes = useStyles({ notClickable })

    const history = useHistory()

    const authUser = useSelector(store => store.auth.user)

    if (!user) {
        user = authUser
    }

    const handleClick = () => {
        if (notClickable) {
            return
        }

        if (!user || user.id === authUser.id) {
            history.push("/profile")
        } else {
            history.push("/user/" + user.id)
        }
    }

    return (
        <span onClick={handleClick} className={classes.username}>
            { user.username }

            <span className={classes.secondary}>
                #{ user.discriminator }
            </span>
        </span>
    )
}

export default Username