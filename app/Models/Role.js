const { v4: uuid } = require("uuid")

const Model = require("../../lib/Model.js")
const Permission = require("./Permission.js")
const { queryAsync } = require("../utils")

class Role extends Model {
    constructor(values) {
        super({
            table: "roles",
            columns: ["id", "name"],
            defaultValues: {
                id: () => uuid()
            },
            ...values
        })

        this.permissions = null
    }

    async init() {
        this.permissions = await this.getPermissions()
    }

    async getPermissions() {
        const permissions = await queryAsync(`
            SELECT permissions.id, permissions.name FROM permissions 
            INNER JOIN role_permissions ON role_permissions.permission_id = permissions.id 
            INNER JOIN roles ON role_permissions.role_id = roles.id 
            WHERE roles.id = '${this.id}'
        `)

        return Permission.fromRows(permissions)
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }
}

Model.bind(Role, "roles")

module.exports = Role