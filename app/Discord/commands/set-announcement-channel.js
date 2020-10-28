const Guild = require("../../Models/Guild.js")

async function run(args, message) {
    const model = await Guild.findBy("id", message.guild.id)

    if (!model) {
        return await message.channel.send("This guild is not registered")
    }

    model.announcement_channel_id = message.channel.id

    await model.update()

    await message.channel.send("Success!")
}

module.exports = run