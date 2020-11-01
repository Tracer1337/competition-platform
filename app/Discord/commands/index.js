const DirectoryServiceProvider = require("../Services/DirectoryServiceProvider.js")

const commands = DirectoryServiceProvider.getCommandsSync()

function run(name, args, message) {
    const command = commands.find(cmd => cmd.name === name || cmd.alias.includes(name))

    if (!command) {
        return message.channel.send("Unknown command")
    }

    if (command.permissions) {
        for (let permission of command.permissions) {
            if (!message.member.hasPermission(permission)) {
                const requiredPerms = command.permissions.map(perm => `'${perm}'`).join(", ")
                return message.channel.send(`Insufficient permissions. This command requires: ${requiredPerms}.`)
            }
        }
    }

    command.run(args, message)
}

module.exports = run