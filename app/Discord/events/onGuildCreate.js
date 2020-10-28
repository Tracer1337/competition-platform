const Guild = require("../../Models/Guild.js")

async function run(guild) {
    const model = new Guild(guild)

    await model.store()
}

module.exports = run