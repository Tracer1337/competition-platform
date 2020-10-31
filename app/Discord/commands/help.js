const DirectoryServiceProvider = require("../Services/DirectoryServiceProvider.js")
const HelpEmbed = require("../Embed/HelpEmbed.js")
const HelpCommandEmbed = require("../Embed/HelpCommandEmbed.js")

async function run(args, message) {
    const commands = await DirectoryServiceProvider.getCommands()

    let embed

    if (!args[0]) {
        embed = new HelpEmbed(commands)
    } else {
        const command = commands.find(command => command.name === args[0])

        if (!command) {
            return await message.channel.send(`The command '${args[0]}' does not exist`)
        }

        embed = new HelpCommandEmbed(command)
    }

    await message.channel.send(embed)
}

module.exports = {
    run,
    desc: "Gives information about the commands.",
    usage: "help <command?>",
    alias: ["?"],
}