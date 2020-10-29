const Guild = require("../../Models/Guild.js")

async function run(args, message) {
    const model = await Guild.findBy("id", message.guild.id)

    if (!model) {
        return await message.channel.send("This guild is not registered")
    }

    try {
        require(`../Lang/${args[0]}.json`)
    } catch {
        return await message.channel.send("This language is not supported")
    }

    model.lang = args[0]

    await model.update()

    await message.channel.send("Changed language successfully")
}

module.exports = run