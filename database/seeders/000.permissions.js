const Permission = require("../../app/Models/Permission.js")

const permissions = require("../../config/permissions.json")

module.exports = {
    table: "permissions",

    run: async () => {
        await Promise.all(permissions.map(name => {
            const model = new Permission({ name })
            return model.store()
        }))
    }
}