const Guild = require("../../app/Models/Guild.js")

module.exports = {
    table: "guilds",

    run: async () => {
        const model = new Guild({ id: "771099628934266891" })
        
        await model.store()
    }
}