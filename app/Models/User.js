const moment = require("moment")
const Model = require("../../lib/Model.js")

class User extends Model {
    constructor(values) {
        super({
            table: "users",
            columns: ["id", "username", "discriminator", "avatar", "created_at", "role_id"],
            defaultValues: {
                created_at: () => moment()
            },
            ...values
        })
    }

    async init() {
        this.created_at = moment(this.created_at)
        this.role = await Role.findBy("id", this.role_id)
    }

    async delete() {
        const projects = await Project.findAllBy("user_id", this.id)

        await Promise.all(projects.map(model => model.delete()))

        return super.delete()
    }

    can(permissionName) {
        if (!this.role) {
            throw new Error("User is not initialized")
        }

        if (this.role.permissions[0].name === "*") {
            return true
        }

        return this.role.permissions.some(({ name }) => name === permissionName)
    }

    getColumns() {
        const values = super.getColumns()
        values.created_at = values.created_at.format()
        return values
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            discriminator: this.discriminator,
            avatar: this.avatar,
            created_at: this.created_at,
            role: this.role
        }
    }
}

Model.bind(User, "users")

module.exports = User

const Project = require("./Project.js")
const Role = require("./Role.js")