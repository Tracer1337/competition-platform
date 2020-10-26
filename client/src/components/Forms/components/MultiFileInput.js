import React, { useState, useEffect, useRef } from "react"
import { useForm, useFormContext, FormProvider } from "react-hook-form"
import { InputLabel, IconButton, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"

import FileInput from "./FileInput.js"

const useStyles = makeStyles(theme => ({
    fileInputWrapper: {
        marginTop: props => props.spacing && theme.spacing(4)
    },

    label: {
        marginBottom: theme.spacing(2)
    },

    buttonWrapper: {
        display: "flex"
    },

    iconButton: {
        height: 30
    }
}))

function MultiFileInput({ name, label, buttonLabel, maxFiles, required = true, spacing = true }) {
    const classes = useStyles({ spacing })
    
    const { register, setValue } = useFormContext()

    const localForm = useForm()

    const idCounter = useRef(0)
    
    const [inputIds, setInputIds] = useState([idCounter.current++])

    const handleAddInput = () => {
        setInputIds([...inputIds, idCounter.current++])
    }

    const handleRemoveInput = (id) => {
        const newIds = inputIds.filter(_id => _id !== id)
        setInputIds(newIds)
    }

    useEffect(() => {
        register({ name }, { required })
    }, [register, name, required])

    useEffect(() => {
        const files = Object.values(localForm.watch()).filter(e => e)

        setValue(name, files)

        // eslint-disable-next-line
    }, [name, localForm.watch()])

    return (
        <div className={classes.fileInputWrapper}>
            <InputLabel className={classes.label}>{ label }{ maxFiles && ` (Max. ${maxFiles})` }</InputLabel>

            <FormProvider {...localForm}>
                { inputIds.map(id => (
                    <div className={classes.buttonWrapper} key={id}>
                        <IconButton onClick={() => handleRemoveInput(id)} size="small" className={classes.iconButton}>
                            <RemoveIcon />
                        </IconButton>

                        <FileInput
                            name={id.toString()}
                            buttonLabel={buttonLabel}
                            spacing={false}
                        />
                    </div>
                )) }
            </FormProvider>

            { inputIds.length < maxFiles && (
                <div>
                    <IconButton onClick={handleAddInput} size="small">
                        <AddIcon />
                    </IconButton>

                    <Button onClick={handleAddInput}>
                        Add Image
                    </Button>
                </div>
            ) }
        </div>
    )
}

export default MultiFileInput