import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import { Paper, InputLabel, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MDEditor from "@uiw/react-md-editor"
import { DateTimePicker } from "@material-ui/pickers"

import Input from "./components/Input.js"
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

function CompetitionForm({ apiMethod, data, isEditMode }) {
    const classes = useStyles()

    const history = useHistory()

    const [briefingText, setBriefingText] = useState(data?.briefing_text || "")
    const [endDate, setEndDate] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const formObject = useForm({
        defaultValues: data
    })
    const { handleSubmit } = formObject

    const onSubmit = (values) => {
        endDate.seconds(0)
        
        values.briefing_text = briefingText
        values.end_at = endDate

        setIsLoading(true)

        apiMethod(values)
            .then((res) => {
                history.push("/competition/" + res.data.id)
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>{ isEditMode ? "Edit" : "Create" } Competition</Typography>

            <Paper variant="outlined" className={classes.formWrapper}>
                <FormProvider {...formObject}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Title */}
                        <Input
                            name="title"
                            label="Title"
                            width="350px"
                            spacing={false}
                        />

                        {/* Briefing */}
                        <div className={classes.spacing}>
                            <InputLabel className={classes.label}>Briefing</InputLabel>
                            
                            <MDEditor value={briefingText} onChange={setBriefingText}/>
                        </div>

                        {/* End Date */}
                        <div className={classes.spacing}>
                            <InputLabel className={classes.label}>End Date</InputLabel>

                            <DateTimePicker
                                value={endDate}
                                onChange={setEndDate}
                                disablePast
                                variant="inline"
                                ampm={false}
                            />
                        </div>

                        {/* Submit */}
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            isLoading={isLoading}
                            className={classes.spacing}
                        >{ isEditMode ? "Save" : "Create" }</LoadingButton>
                        
                    </form>
                </FormProvider>
            </Paper>
        </div>
    )
}

export default CompetitionForm