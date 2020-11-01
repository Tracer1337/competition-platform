import React from "react"
import { DataGrid } from "@material-ui/data-grid"
import { makeStyles } from "@material-ui/core/styles"

import useAPIData from "../../utils/useAPIData.js"
import Avatar from "../User/Avatar.js"
import { opener } from "../ComponentOpener/ComponentOpener.js"

const useStyles = makeStyles(theme => ({
    userManager: {
        height: 500
    }
}))

const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 200
    },
    {
        field: "username",
        headerName: "Username"
    },
    {
        field: "discriminator",
        headerName: "Discriminator"
    },
    {
        field: "avatar",
        renderCell: (params) => <Avatar user={params.data}/>
    },
    {
        field: "role",
        headerName: "Role"
    },
    {
        field: "created_at",
        headerName: "Created At",
        width: 150
    }
]

function UserManager() {
    const classes = useStyles()

    const { isLoading, data, reload } = useAPIData("getAllUsers")

    const handleCellClick = (event) => {
        const user = data.find(user => user.id === event.data.id)
        const dialog = opener.openDialog("UpdateUser", { user })

        dialog.addEventListener("close", (shouldReload) => {
            if (shouldReload === true) {
                reload()
            }
        })
    }

    const rows = isLoading ? [] : data.map(user => ({
        ...user,
        role: user.role.name,
        created_at: user.created_at.format("DD.MM.YYYY HH:mm")
    }))

    return (
        <div className={classes.userManager}>
            <DataGrid
                loading={isLoading}
                columns={columns}
                rows={rows}
                onCellClick={handleCellClick}
            />
        </div>
    )
}

export default UserManager