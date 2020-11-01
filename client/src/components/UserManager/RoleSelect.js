import React, { useState } from "react"
import { CircularProgress } from "@material-ui/core"

import Select from "../Forms/components/Select.js"
import useAPIData from "../../utils/useAPIData.js"
import { editUser } from "../../config/api.js"

function RoleSelect({ user }) {
    const [isSaving, setIsSaving] = useState(false)
    const [roleId, setRoleId] = useState(user.role.id)

    const { isLoading, data } = useAPIData("getAllRoles")

    const handleChange = (event) => {
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