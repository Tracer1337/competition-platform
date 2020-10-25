import React from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { Avatar as MuiAvatar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { getAvatarURL } from "../../utils/discord.js"

const useStyles = makeStyles(theme => ({
    avatar: {
        cursor: "pointer"
    }
}))

function Avatar({ user }) {
    const classes = useStyles()

    const history = useHistory()

    const isLoggedIn = useSelector(store => store.auth.isLoggedIn)
    const authUser = useSelector(store => store.auth.user)

    if (!user) {
        user = authUser
    }

    const handleAvatarClick = () => {
        if (!user || user.id === authUser.id) {
            history.push("/profile")
        } else {
            history.push("/user/" + user.id)
        }
    }

    return (
        <MuiAvatar className={classes.avatar} onClick={handleAvatarClick} src={isLoggedIn ? getAvatarURL(user) : null} />
    )
}

export default Avatar