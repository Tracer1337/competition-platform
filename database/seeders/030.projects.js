const path = require("path")
const User = require("../../app/Models/User.js")
const Competition = require("../../app/Models/Competition.js")
const Project = require("../../app/Models/Project.js")
const StorageFacade = require("../../app/Facades/StorageFacade.js")
const { randomFileName, getFileExtension } = require("../../app/utils/index.js")
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") })

const ASSETS_DIR = path.join(__dirname, "assets")
const PROJECT_FILE = path.join(ASSETS_DIR, "projectfile.js")

module.exports = {
    table: "projects",

    run: async () => {
        const users = await User.getAll()
        const { id: competition_id } = (await Competition.getAll())[0]

        const [description, project_url, created_at] = ["My Project", "https://www.npmjs.com/package/cron", "2020-10-27T13:35:13+01:00"]

        await Promise.all(users.map(async user => {
            const filename = randomFileName() + getFileExtension(PROJECT_FILE)

            await StorageFacade.uploadFileLocal(PROJECT_FILE, filename)

            const model = new Project({ user_id: user.id, competition_id, description, filename, project_url, created_at })

            await model.init()

            await model.store()
        }))
    }
}