import React from "react"
import { useFormContext } from "react-hook-form"
import { TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    input: {
        marginTop: theme.spacing(4)
    }
}))

function Input({ name, type, label, width, required = true, fullWidth = false }) {
    const classes = useStyles()

    const { register, errors } = useFormContext()

    const hasError = name in errors

    return (
        <TextField
            inputRef={register({ required })}
            fullWidth={fullWidth}
            type={type}
            name={name}
            label={label}
            className={classes.input}
            error={hasError}
            helperText={hasError && errors[name].message}
            style={{ width: width }}
        />
    )
}

export default Input