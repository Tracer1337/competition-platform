const fs = require("fs")

const CommandServiceProvider = require("../Services/CommandServiceProvider.js")
const HelpEmbed = require("../Embed/HelpEmbed.js")

async function run(args, message) {
    const commands = await CommandServiceProvider.getCommands()

    const embed = new HelpEmbed(commands)

    await message.channel.send(embed)
}

module.exports = {
    run,
    alias: ["?"],
    desc: "Shows all commands and what they do."
}