const BaseEmbed = require("./BaseEmbed.js")
const { makeURL } = require("../../utils")

class UpdateEndDateEmbed extends BaseEmbed {
    constructor({ competition, prevEndDate }, strings) {
        super()

        const delta = prevEndDate.from(competition.end_at).replace(/(ago|in)/g, "").trim()
        const sign = Math.sign(competition.end_at.diff(prevEndDate))

        this.setTitle(`${strings["competitions.updateEndDate.title"]}: ${competition.title}`)
            .setUser(competition.user)
            .setURL(makeURL("/competition/" + competition.id))
            .setDescription(
                `${strings["competitions.updateEndDate.desc"]} **${delta} ${sign > 0 ? strings["competitins.updateEndDate.more"] : strings["competitins.updateEndDate.less"]}!**`
            )
            .addField(strings["competitions.updateEndDate.endDate"], competition.end_at.format("DD.MM.YYYY HH:mm"))
    }
}

module.exports = UpdateEndDateEmbed