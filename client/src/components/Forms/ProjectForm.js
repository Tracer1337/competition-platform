import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import { Paper, InputLabel, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MDEditor from "@uiw/react-md-editor"

import FileInput from "./components/FileInput.js"
import MultiFileInput from "./components/MultiFileInput.js"
import LoadingButton from "./components/LoadingButton.js"

const useStyles = makeStyles(theme => ({
    formWrapper: {
        padding: theme.spacing(2)
    },

    spacing: {
        marginTop: theme.spacing(4)
    },

    label: {
        marginBottom: theme.spacing(2)
    }
}))

function ProjectForm({ apiMethod, isEditMode, data, competitionId }) {
    const classes = useStyles()

    const history = useHistory()

    const [descText, setDescText] = useState(data?.description || "")
    const [isLoading, setIsLoading] = useState(false)

    const formObject = useForm({
        defaultValues: data
    })
    const { handleSubmit } = formObject

    const onSubmit = (values) => {
        values.description = descText

        const formData = new FormData()

        formData.append("file", values.file)
        formData.append("description", values.description)
        formData.append("competition_id", competitionId)
        
        for (let image of values.images) {
            formData.append("images", image)
        }

        setIsLoading(true)

        apiMethod(formData)
            .then(() => {
                history.push("/competition/" + competitionId)
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>{ isEditMode ? "Edit" : "Submit" } Project</Typography>

            <Paper variant="outlined" className={classes.formWrapper}>
                <FormProvider {...formObject}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* File */}
                        <FileInput
                            name="file"
                            label="Project File"
                            buttonLabel={isEditMode ? "Upload New File" : "Upload File"}
                            spacing={false}
                            required={!isEditMode}
                        />

                        {/* Description */}
                        <div className={classes.spacing}>
                            <InputLabel className={classes.label}>Description</InputLabel>

                            <MDEditor value={descText} onChange={setDescText} />
                        </div>

                        {/* Images */}
                        <MultiFileInput
                            name="images"
                            label="Images"
                            buttonLabel="Upload Image"
                            maxFiles={5}
                        />

                        {/* Submit */}
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            isLoading={isLoading}
                            className={classes.spacing}
                        >{ isEditMode ? "Save" : "Submit" }</LoadingButton>

                    </form>
                </FormProvider>
            </Paper>
        </div>
    )
}

export default ProjectForm