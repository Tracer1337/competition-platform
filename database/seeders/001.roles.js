const { v4: uuid } = require("uuid")

const Role = require("../../app/Models/Role.js")
const Permission = require("../../app/Models/Permission.js")
const { queryAsync } = require("../../app/utils")

const roles = require("../../config/roles.json")

module.exports = {
    table: "roles",

    run: async () => {
        await Promise.all(Object.entries(roles).map(async ([name, { inherits = [], permissions }]) => {
            permissions = new Set(permissions)

            inherits.forEach(name => {
                roles[name].permissions.forEach(permission => {
                    permissions.add(permission)
                })
            })

            permissions = Array.from(permissions)
            
            const role = new Role({ name })

            await role.store()

            await Promise.all(permissions.map(async permissionName => {
                const permission = await Permission.findBy("name", permissionName)

                await queryAsync("INSERT INTO role_permissions SET ?", {
                    id: uuid(),
                    role_id: role.id,
                    permission_id: permission.id 
                })
            }))
        }))
    }
}