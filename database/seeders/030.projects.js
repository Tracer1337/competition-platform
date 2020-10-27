const path = require("path")
const User = require("../../app/Models/User.js")
const Competition = require("../../app/Models/Competition.js")
const Project = require("../../app/Models/Project.js")
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") })

module.exports = {
    table: "projects",

    run: async () => {
        const { id: user_id } = (await User.getAll())[0]
        const { id: competition_id } = (await Competition.getAll())[0]

        const data = [
            ["First project", "123.zip", "https://www.npmjs.com/package/cron", "2020-10-27T13:35:13+01:00"],
            ["Second project", "123.zip", "https://www.npmjs.com/package/cron", "2020-10-27T13:40:13+01:00"],
            ["Third project", "123.zip", "https://www.npmjs.com/package/cron", "2020-10-27T13:45:13+01:00"],
            ["Fourth project", "123.zip", "https://www.npmjs.com/package/cron", "2020-10-27T13:50:13+01:00"]
        ]

        await Promise.all(data.map(async ([description, filename, project_url, created_at]) => {
            const model = new Project({ user_id, competition_id, description, filename, project_url, created_at })
            await model.init()
            await model.store()
        }))
    }
}