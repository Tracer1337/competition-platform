const BaseEmbed = require("./BaseEmbed.js")
const { makeURL } = require("../../utils")

class UpdateEndDateEmbed extends BaseEmbed {
    constructor(competition) {
        super()

        this.setTitle("Updated: " + competition.title)
            .setUser(competition.user)
            .setURL(makeURL("/competition/" + competition.id))
            .setDescription("The competition does now have a deadline!")
            .addField("End Date", competition.end_at.format("DD.MM.YYYY HH:mm"))
    }
}

module.exports = UpdateEndDateEmbed