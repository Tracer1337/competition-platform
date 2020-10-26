import React, { useState } from "react"
import clsx from "clsx"
import { Dialog } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import AuthImage from "../AuthImage.js"

const useStyles = makeStyles(theme => ({
    image: {
        cursor: "pointer",
        transition: theme.transitions.create(),
        
        "&:hover": {
            boxShadow: theme.shadows[5]
        }
    },

    dialogImage: {
        maxWidth: 700,
        maxHeight: 700,
        objectFit: "cover"
    }
}))

function Image({ className, filename }) {
    const classes = useStyles()

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            <AuthImage filename={filename} className={clsx(className, classes.image)} onClick={() => setIsDialogOpen(true)}/>

            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            >
                <AuthImage filename={filename} className={classes.dialogImage}/>
            </Dialog>
        </>
    )
}

export default Image