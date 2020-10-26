import React, { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Button, Tooltip, InputLabel, FormHelperText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { MAX_UPLOAD_FILE_SIZE } from "../../../config/constants.js"

const useStyles = makeStyles(theme => ({
    fileInputWrapper: {
        marginTop: props => props.spacing && theme.spacing(4)
    },
    
    label: {
        marginBottom: theme.spacing(2)
    },

    file: {
        display: "none"
    }
}))

function FileInput({ name, label, buttonLabel, required = true, fullWidth = false, spacing = true }) {
    const classes = useStyles({ spacing })

    const { register, setValue, watch, errors, setError, clearErrors } = useFormContext()

    const handleChange = (event) => {
        const file = event.target.files[0]

        if (!file) {
            return
        }

        if (file.size > MAX_UPLOAD_FILE_SIZE) {
            setError(name, { message: `The file is too big (Max. ${MAX_UPLOAD_FILE_SIZE / 1024 / 1024}MB)` })
        } else {
            clearErrors(name)
            setValue(name, file)
        }
    }

    useEffect(() => {
        register({ name }, { required })
    }, [register, name, required])

    const hasError = name in errors

    return (
        <div className={classes.fileInputWrapper}>
            { label && <InputLabel className={classes.label} error={hasError}>{label}</InputLabel> }

            <Tooltip title={`Max ${MAX_UPLOAD_FILE_SIZE / 1024 / 1024}MB`}>
                <Button
                    fullWidth={fullWidth}
                    component="label"
                >
                    { watch(name)?.name || buttonLabel }
                    <input type="file" className={classes.file} onChange={handleChange} />
                </Button>
            </Tooltip>

            {hasError && (
                <FormHelperText error>{errors[name].message}</FormHelperText>
            )}
        </div>
    )
}

export default FileInput