const Guild = require("../../Models/Guild.js")
const DirectoryServiceProvider = require("../Services/DirectoryServiceProvider.js")

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

const languages = DirectoryServiceProvider.getLanguagesSync()

module.exports = {
    run,
    desc: "Sets the language in which announcements are sent. The following languages are available: *" + languages.join(", ") + "*.",
    usage: "set-language <language>",
    alias: ["language", "lang"]
}