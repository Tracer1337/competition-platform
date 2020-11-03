const runCommand = require("../commands")

async function run(message) {
    if (message.content.startsWith(process.env.DISCORD_BOT_PREFIX)) {
        if (!message.guild) {
            return await message.channel.send("Commands are only available in guilds")
        }

        const args = message.content
            .replace(process.env.DISCORD_BOT_PREFIX, "")
            .replace(/\s+/g, " ")
            .split(" ")

        const command = args.shift()

        runCommand(command, args, message)
    }
}

module.exports = run