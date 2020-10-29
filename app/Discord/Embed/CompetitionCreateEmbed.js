const BaseEmbed = require("./BaseEmbed.js")
const { makeURL } = require("../../utils")

class CompetitionCreateEmbed extends BaseEmbed {
    constructor({ competition }) {
        super()

        this.setTitle("New competition: " + competition.title)
            .setUser(competition.user)
            .setDescription(`<@${competition.user.id}> has created a new competition - Check it out!`)
            .setURL(makeURL("/competition/" + competition.id))
        
        this.addField("End Date", competition.end_at ? competition.end_at.format("DD.MM.YYYY HH:mm") : "Open End")
    }
}

module.exports = CompetitionCreateEmbed