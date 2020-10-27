const path = require("path")
const User = require("../../app/Models/User.js")
const Competition = require("../../app/Models/Competition.js")
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") })

module.exports = {
    table: "competitions",

    run: async () => {
        const { id: user_id } = (await User.getAll())[0]

        const data = [
            ["This is my amazing competition!", 
`### My Briefing

* 1
* 2
* 3`, 
            "2020-10-29T23:00:00.000Z", "2020-10-27T07:55:26+01:00"],
            ["Pizza Time!", 
`#### Pizza Pizza!

1. Pizza
2. Time

![](https://www.koch-mit.de/app/uploads/2020/02/pizzatitel-300x169.jpg)`,
            "2020-11-10T11:00:00.000Z", "2020-10-27T07:56:26+01:00"]
        ]

        await Promise.all(data.map(async ([title, briefing_text, end_at, created_at]) => {
            const model = new Competition({ user_id, title, briefing_text, end_at, created_at })
            await model.init()
            await model.store()
        }))
    }
}