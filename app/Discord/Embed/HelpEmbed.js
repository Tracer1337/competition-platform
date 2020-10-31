const BaseEmbed = require("./BaseEmbed.js")

class HelpEmbed extends BaseEmbed {
    constructor() {
        super()

        this.setTitle("Help")
            .setTimestamp(false)
    }
}

module.exports = HelpEmbed