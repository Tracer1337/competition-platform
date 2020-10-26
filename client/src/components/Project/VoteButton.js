import React, { useState } from "react"
import { useSelector } from "react-redux"
import { IconButton, Button, Typography, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import VoteIcon from "@material-ui/icons/ThumbUp"

import { voteForProject, removeVoteFromProject } from "../../config/api.js"

const useStyles = makeStyles(theme => ({
    spacingRight: {
        marginRight: props => theme.spacing(props.extended ? 2 : 1)
    }
}))

function VoteButton({ project, extended }) {
    const classes = useStyles({ extended })

    const isLoggedIn = useSelector(store => store.auth.isLoggedIn)

    const [hasVoted, setHasVoted] = useState(project.hasVoted)
    const [isLoading, setIsLoading] = useState(false)
    const [votes, setVotes] = useState(project.votes)

    const handleClick = () => {
        if (isLoading) {
            return
        }
        
        setIsLoading(true)

        if (!hasVoted) {
            voteForProject(project.id)
                .then(() => {
                    setVotes(votes + 1)
                    setHasVoted(true)
                })
                .finally(() => setIsLoading(false))
        } else {
            removeVoteFromProject(project.id)
                .then(() => {
                    setVotes(votes - 1)
                    setHasVoted(false)
                })
                .finally(() => setIsLoading(false))
        }
    }

    if (!isLoggedIn) {
        return null
    }

    return (
        <Grid item>
            <Grid container alignItems="center">
                { !extended ? (
                    <IconButton onClick={handleClick} size={!extended ? "small" : undefined} color={hasVoted ? "primary" : undefined} className={classes.spacingRight}>
                        <VoteIcon />
                    </IconButton>
                ) : (
                    <Button
                        startIcon={<VoteIcon/>}
                        onClick={handleClick}
                        color={hasVoted ? "primary" : undefined}
                        variant="outlined"
                        className={classes.spacingRight}
                    >
                        Vote For {project.user.username}
                    </Button>
                )}

                <Typography variant={extended ? "button" : undefined}>{ votes } Votes</Typography>
            </Grid>
        </Grid>
    )
}

export default VoteButton