import React from "react"
import { DataGrid } from "@material-ui/data-grid"
import { makeStyles } from "@material-ui/core/styles"

import useAPIData from "../../utils/useAPIData.js"
import Avatar from "../User/Avatar.js"
import Username from "../User/Username.js"
import RoleSelect from "./RoleSelect.js"

const useStyles = makeStyles(theme => ({
    userManager: {
        height: 500
    }
}))

const columns = [
    {
        field: "avatar",
        headerName: "Avatar",
        renderCell: (params) => <Avatar user={params.data}/>
    },
    {
        field: "fullUsername",
        headerName: "Username",
        width: 150,
        renderCell: (params) => <Username user={params.data}/>
    },
    {
        field: "id",
        headerName: "ID",
        width: 200
    },
    {
        field: "role_name",
        headerName: "Role",
        width: 150,
        renderCell: (params) => <RoleSelect user={params.data}/>
    },
    {
        field: "created_at",
        headerName: "Created At",
        width: 150
    },
    {
        field: "points",
        headerName: "Points"
    },
    {
        field: "level",
        headerName: "Level"
    }
]

function UserManager() {
    const classes = useStyles()

    const { isLoading, data } = useAPIData({
        method: "getAllUsers",
        useCache: false
    })

    const { isLoading: isLoadingRoles } = useAPIData("getAllRoles")

    const rows = isLoading ? [] : data.map(user => ({
        ...user,
        role_name: user.role.name,
        created_at: user.created_at.format("DD.MM.YYYY HH:mm")
    }))

    return (
        <div className={classes.userManager}>
            <DataGrid
                loading={isLoading || isLoadingRoles}
                columns={columns}
                rows={rows}
            />
        </div>
    )
}

export default UserManager