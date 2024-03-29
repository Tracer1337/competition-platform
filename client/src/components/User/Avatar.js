import React from "react"
import clsx from "clsx"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { Avatar as MuiAvatar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    avatar: {
        cursor: props => !props.notClickable && "pointer",
        width: props => props.size,
        height: props => props.size
    }
}))

function Avatar({ user, size, className, notClickable = false }) {
    const classes = useStyles({ size, notClickable })

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
        <MuiAvatar className={clsx(className, classes.avatar)} onClick={handleClick} src={user?.avatar_url} />
    )
}

export default Avatar