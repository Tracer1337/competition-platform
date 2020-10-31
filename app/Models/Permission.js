const { v4: uuid } = require("uuid")

const Model = require("../../lib/Model.js")

class Permission extends Model {
    constructor(values) {
        super({
            table: "permissions",
            columns: ["id", "name"],
            defaultValues: {
                id: () => uuid()
            },
            ...values
        })
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }
}

Model.bind(Permission, "permissions")

module.exports = Permission