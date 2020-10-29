const BaseEmbed = require("./BaseEmbed.js")
const { makeURL } = require("../../utils")

class UpdateEndDateEmbed extends BaseEmbed {
    constructor({ competition, prevEndDate }) {
        super()

        const delta = prevEndDate.from(competition.end_at).replace(/(ago|in)/g, "").trim()
        const sign = Math.sign(competition.end_at.diff(prevEndDate))

        this.setTitle("Updated: " + competition.title)
            .setUser(competition.user)
            .setURL(makeURL("/competition/" + competition.id))
            .setDescription(`The end date got delayed, you now have **${delta} ${sign > 0 ? "more" : "less"}!**`)
            .addField("End Date", competition.end_at.format("DD.MM.YYYY HH:mm"))
    }
}

module.exports = UpdateEndDateEmbed