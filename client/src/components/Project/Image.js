import React, { useState } from "react"
import clsx from "clsx"
import { Dialog } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

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

function Image({ className, data }) {
    const classes = useStyles()

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            <img src={data.url} alt="" className={clsx(className, classes.image)} onClick={() => setIsDialogOpen(true)}/>

            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            >
                <img src={data.url} alt="" className={classes.dialogImage}/>
            </Dialog>
        </>
    )
}

export default Image