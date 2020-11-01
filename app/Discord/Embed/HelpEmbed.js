const BaseEmbed = require("./BaseEmbed.js")
const { makeCodeblock } = require("../utils")

class HelpEmbed extends BaseEmbed {
    constructor(commands) {
        super()

        this.setTitle("Help")
            .setDescription(`Type \`\`${process.env.DISCORD_BOT_PREFIX}help <command>\`\` to get more information about a specific command.`)
            .setTimestamp(false)

        this.addField("Available Commands", makeCodeblock(commands.map(command => command.name).join("\n")))
    }
}

module.exports = HelpEmbed