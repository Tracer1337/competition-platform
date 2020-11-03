import React, { useState } from "react"
import { useSelector } from "react-redux"
import { CircularProgress } from "@material-ui/core"

import Select from "../Forms/components/Select.js"
import useAPIData from "../../utils/useAPIData.js"
import { editUser } from "../../config/api.js"
import { opener } from "../ComponentOpener/ComponentOpener.js"

function RoleSelect({ user }) {
    const me = useSelector(store => store.auth.user)
    
    const [isSaving, setIsSaving] = useState(false)
    const [roleId, setRoleId] = useState(user.role.id)

    const { isLoading, data } = useAPIData("getAllRoles")

    const handleChange = async (event) => {
        if (user.id === me.id) {
            const dialog = opener.openDialog("Confirm", { content: "Your own role will be changed" })

            const hasAccepted = await new Promise(resolve => dialog.addEventListener("close", resolve))

            if (!hasAccepted) {
                return
            }
        }

        setIsSaving(true)

        editUser(user.id, {
            role_id: event.target.value
        })
            .then(res => setRoleId(res.data.role.id))
            .finally(() => setIsSaving(false))
    }

    const roles = !isLoading && data.map(role => ({
        name: role.name,
        value: role.id
    }))

    if (isLoading || isSaving) {
        return <CircularProgress />
    }

    return (
        <Select
            label="Role"
            options={roles}
            value={roleId}
            onChange={handleChange}
        />
    )
}

export default RoleSelect