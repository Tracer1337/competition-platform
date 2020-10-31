const BaseEmbed = require("./BaseEmbed.js")
const { makeURL } = require("../../utils")

class SetEndDateEmbed extends BaseEmbed {
    static event = "setEndDate"

    constructor(competition, strings) {
        super()

        this.setTitle(`${strings["competitions.setEndDate.title"]}: ${competition.title}`)
            .setUser(competition.user)
            .setURL(makeURL("/competition/" + competition.id))
            .setDescription(strings["competitions.setEndDate.desc"])
            .addField(strings["competitions.setEndDate.endDate"], competition.end_at.format("DD.MM.YYYY HH:mm"))
    }
}

module.exports = SetEndDateEmbed