const BaseEmbed = require("./BaseEmbed.js")
const { makeURL } = require("../../utils")

class CompetitionEndEmbed extends BaseEmbed {
    constructor(competition) {
        super()

        this.setTitle("The competition has ended: " + competition.title)
            .setUser(competition.user)
            .setURL(makeURL("/competition/" + competition.id))
            .addField(
                `The ${competition.winner_projects.length === 1 ? "winner is" : "winners are"}`,
                competition.winner_projects.map(project => `<@${project.user.id}>`).join(" ") + "\n**Congratulations!** :partying_face:"
            )
    }
}

module.exports = CompetitionEndEmbed