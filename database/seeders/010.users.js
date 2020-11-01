const path = require("path")
const User = require("../../app/Models/User.js")
const Role = require("../../app/Models/Role.js")
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") })

module.exports = {
    table: "users",

    run: async () => {
        const data = [
            ["224908212212596736", "Tracer", "4984", "9615a79cae01b14babdeaabdaf1c4ead", "2020-10-27T07:54:46+01:00"],
            ["339062431131369472", "wolflu", "5506", "a5f7a44ad662669a27dd07b4a8fef15b", "2020-10-27T16:22:05+00:00"]
        ]

        const { id: role_id } = await Role.findBy("name", "User")

        await Promise.all(data.map(async ([id, username, discriminator, avatar, created_at]) => {
            const model = new User({ id, username, discriminator, avatar, created_at, role_id })
            await model.init()
            await model.store()
        }))

        const me = await User.findBy("username", "Tracer")

        if (me) {
            me.role_id = (await Role.findBy("name", "Admin")).id
            
            await me.update()
        }
    }
}