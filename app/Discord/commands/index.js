const CommandServiceProvider = require("../Services/CommandServiceProvider.js")

const commands = CommandServiceProvider.getCommandsSync()

function run(name, args, message) {
    const command = commands.find(cmd => cmd.name === name || cmd.alias.includes(name))

    if (!command) {
        return message.channel.send("Unknown command")
    }

    command.run(args, message)
}

module.exports = run