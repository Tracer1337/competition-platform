import React from "react"
import { useForm, FormProvider } from "react-hook-form"

import Input from "./components/Input.js"

function CreateCompetitionForm() {
    const formObject = useForm()
    const { handleSubmit } = formObject

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <FormProvider {...formObject}>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Title */}
                <Input
                    name="title"
                    label="Title"
                />

            </form>
        </FormProvider>
    )
}

export default CreateCompetitionForm