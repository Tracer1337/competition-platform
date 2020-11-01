import React, { useState } from "react"
import { CircularProgress, Dialog, DialogTitle, DialogContent } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useForm, FormProvider } from "react-hook-form"
import LoadingButton from "../Styled/LoadingButton.js"

import Select from "../Forms/components/Select.js"
import useAPIData from "../../utils/useAPIData.js"
import { editUser } from "../../config/api.js"

const useStyles = makeStyles(theme => ({
    input: {
        marginBottom: theme.spacing(2)
    }
}))

function UpdateUserDialog({ onClose, open, user }) {
    const classes = useStyles()

    const [isSaving, setIsSaving] = useState(false)

    const { isLoading, data } = useAPIData("getAllRoles")

    const formObject = useForm({
        defaultValues: {
            role_id: user.role.id
        }
    })

    const { handleSubmit } = formObject

    const onSubmit = (values) => {
        editUser(user.id, values)
            .then(() => onClose(true))
            .finally(() => setIsSaving(false))
    }

    const roles = !isLoading && data.map(role => ({
        name: role.name,
        value: role.id
    }))

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>{user.fullUsername}</DialogTitle>
            
            <DialogContent>
                <FormProvider {...formObject}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        { isLoading ? <CircularProgress/> : (
                            <Select
                                name="role_id"
                                label="Role"
                                options={roles}
                                className={classes.input}
                            />
                        )}

                        <LoadingButton type="submit" isLoading={isSaving}>Save</LoadingButton>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateUserDialog