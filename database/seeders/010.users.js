const path = require("path")
const User = require("../../app/Models/User.js")
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") })

module.exports = {
    table: "users",

    run: async () => {
        const users = [
            ["224908212212596736", "Tracer", "4984", "9615a79cae01b14babdeaabdaf1c4ead", "2020-10-27T07:54:46+01:00"]
        ]

        await Promise.all(users.map(async ([id, username, discriminator, avatar, created_at]) => {
            const model = new User({ id, username, discriminator, avatar, created_at })
            await model.init()
            await model.store()
        }))
    }
}