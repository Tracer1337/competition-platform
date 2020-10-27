import React, { useState } from "react"
import clsx from "clsx"
import { useHistory } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import { Paper, InputLabel, Typography, IconButton, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MDEditor from "@uiw/react-md-editor"
import DeleteIcon from "@material-ui/icons/Delete"

import Input from "./components/Input.js"
import FileInput from "./components/FileInput.js"
import MultiFileInput from "./components/MultiFileInput.js"
import LoadingButton from "./components/LoadingButton.js"
import { deleteImage } from "../../config/api.js"

const useStyles = makeStyles(theme => ({
    formWrapper: {
        padding: theme.spacing(2)
    },

    spacingTop: {
        marginTop: theme.spacing(4)
    },

    spacingBottom: {
        marginBottom: theme.spacing(2)
    },
    
    spacingRight: {
        marginRight: theme.spacing(2)
    },

    imageWrapper: {
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
    },

    image: {
        height: 100
    }
}))

function Image({ data, onReload }) {
    const classes = useStyles()

    const handleClick = () => {
        deleteImage(data.id)
            .then(() => onReload())
    }

    return (
        <Paper className={clsx(classes.spacingBottom, classes.imageWrapper)}>
            <Grid container alignItems="center">
                <Grid item className={classes.spacingRight}>
                    <IconButton onClick={handleClick}>
                        <DeleteIcon/>
                    </IconButton>
                </Grid>

                <Grid item>
                    <img src={data.url} className={classes.image} alt=""/>
                </Grid>
            </Grid>
        </Paper>
    )
}

function ProjectForm({ apiMethod, isEditMode, data, competitionId, onReload = () => {} }) {
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
        formData.append("project_url", values.project_url)
        
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

                        {/* URL */}
                        <Input
                            name="project_url"
                            label="Project URL"
                            width="300px"
                            required={false}
                        />

                        {/* Description */}
                        <div className={classes.spacingTop}>
                            <InputLabel className={classes.spacingBottom}>Description</InputLabel>

                            <MDEditor value={descText} onChange={setDescText} />
                        </div>

                        {/* Images */}
                        <MultiFileInput
                            name="images"
                            label="Images"
                            buttonLabel="Upload Image"
                            maxFiles={5 - (data?.images.length || 0)}
                        />

                        { isEditMode && (
                            <div>
                                { data.images.map(image => (
                                    <Image data={image} key={image.id} onReload={onReload}/>
                                )) }
                            </div>
                        ) }

                        {/* Submit */}
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            isLoading={isLoading}
                            className={classes.spacingTop}
                        >{ isEditMode ? "Save" : "Submit" }</LoadingButton>

                    </form>
                </FormProvider>
            </Paper>
        </div>
    )
}

export default ProjectForm