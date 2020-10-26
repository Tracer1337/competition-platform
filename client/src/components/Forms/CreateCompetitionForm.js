import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import { Paper, InputLabel, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MDEditor from "@uiw/react-md-editor"
import { DateTimePicker } from "@material-ui/pickers"

import Input from "./components/Input.js"
import LoadingButton from "./components/LoadingButton.js"
import { createCompetition } from "../../config/api.js"

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

function CreateCompetitionForm() {
    const classes = useStyles()

    const history = useHistory()

    const [briefingText, setBriefingText] = useState("")
    const [endDate, setEndDate] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const formObject = useForm()
    const { handleSubmit } = formObject

    const onSubmit = (values) => {
        values.briefing_text = briefingText
        values.end_at = endDate

        setIsLoading(true)

        createCompetition(values)
            .then((res) => {
                history.push("/competition/" + res.data.id)
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>Create Competition</Typography>

            <Paper variant="outlined" className={classes.formWrapper}>
                <FormProvider {...formObject}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Title */}
                        <Input
                            name="title"
                            label="Title"
                            width="350px"
                            hasSpacing={false}
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
                        >Create</LoadingButton>
                    </form>
                </FormProvider>
            </Paper>
        </div>
    )
}

export default CreateCompetitionForm