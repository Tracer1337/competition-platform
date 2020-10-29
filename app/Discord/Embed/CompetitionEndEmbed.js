const BaseEmbed = require("./BaseEmbed.js")
const { makeURL } = require("../../utils")

class CompetitionEndEmbed extends BaseEmbed {
    constructor(competition, strings) {
        super()

        this.setTitle(`${strings["competitions.end.title"]}: ${competition.title}`)
            .setUser(competition.user)
            .setURL(makeURL("/competition/" + competition.id))
            .addField(
                competition.winner_projects.length === 1 ? strings["competitions.end.winner.singular"] : strings["competitions.end.winner.plural"],
                competition.winner_projects.map(project => `<@${project.user.id}>`).join(" ") + `\n**${strings["competitions.end.congrats"]}** :partying_face:`
            )
    }
}

module.exports = CompetitionEndEmbed