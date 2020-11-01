const BaseEmbed = require("./BaseEmbed.js")
const { makeCodeblock } = require("../utils")

class HelpCommandEmbed extends BaseEmbed {
    constructor(command) {
        super()

        this.setTitle("Help: " + command.name)
            .setDescription(command.desc)
            .setTimestamp(false)

        this.addField("Usage", makeCodeblock(process.env.DISCORD_BOT_PREFIX + command.usage))

        this.addField("Required Permissions", makeCodeblock(command.permissions.join("\n")))

        this.addField("Aliases", makeCodeblock(command.alias.join("\n")))
    }
}

module.exports = HelpCommandEmbed