import React from "react"
import { Grid, Typography } from "@material-ui/core"

import Avatar from "./Avatar.js"
import Username from "./Username.js"

function Profile({ user, className }) {
    return (
        <Grid container className={className} spacing={4}>
            <Grid item>
                <Avatar user={user} size={64} notClickable/>
            </Grid>
            
            <Grid item xs container direction="column">
                <Grid item>
                    <Typography variant="h5">
                        <Username user={user} notClickable/>
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography variant="h6">Level { user.level }</Typography>
                </Grid>
            </Grid>

            <Grid item xs container justify="flex-end" alignItems="center">
                <Typography variant="h6">{ user.role.name }</Typography>
            </Grid>
        </Grid>
    )
}

export default Profile