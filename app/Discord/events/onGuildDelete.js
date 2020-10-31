const Guild = require("../../Models/Guild.js")

async function run(guild) {
    const model = await Guild.findBy("id", guild.id)

    await model.delete()
}

module.exports = run