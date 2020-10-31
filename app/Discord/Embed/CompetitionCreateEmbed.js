const BaseEmbed = require("./BaseEmbed.js")
const { makeURL } = require("../../utils")

class CompetitionCreateEmbed extends BaseEmbed {
    static event = "createCompetition"

    constructor(competition, strings) {
        super()

        this.setTitle(`${strings["competitions.new.title"]}: ${competition.title}`)
            .setUser(competition.user)
            .setDescription(`<@${competition.user.id}> ${strings["competitions.new.desc"]}`)
            .setURL(makeURL("/competition/" + competition.id))
        
        this.addField(strings["competitions.endDate"], competition.end_at ? competition.end_at.format("DD.MM.YYYY HH:mm") : strings["competitions.openEnd"])
    }
}

module.exports = CompetitionCreateEmbed