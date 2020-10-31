const BaseEmbed = require("./BaseEmbed.js")
const { makeURL } = require("../../utils")

class UpdateEndDateEmbed extends BaseEmbed {
    static event = "updateEndDate"

    constructor({ competition, prevEndDate }, strings, lang) {
        super()

        competition.end_at.locale(lang)

        let delta = competition.end_at.from(prevEndDate)

        function replace(search, value) {
            delta = delta.replace(search, value)
        }

        if (lang === "en") {
            replace(/(\bago\b|\bin\b)/g, "")
        } else if (lang === "de") {
            replace(/(\bin\b|\bvor\b)/g, "")
            replace("einer", "eine")
            replace("einem", "einen")
            replace("Tagen", "Tage")
            replace("Monaten", "Monate")
        }

        delta = delta.trim()

        const sign = Math.sign(competition.end_at.diff(prevEndDate))

        this.setTitle(`${strings["competitions.updateEndDate.title"]}: ${competition.title}`)
            .setUser(competition.user)
            .setURL(makeURL("/competition/" + competition.id))
            .setDescription(
                `${strings["competitions.updateEndDate.desc"]} **${delta} ${sign > 0 ? strings["competitions.updateEndDate.more"] : strings["competitions.updateEndDate.less"]}!**`
            )
            .addField(strings["competitions.updateEndDate.endDate"], competition.end_at.format("DD.MM.YYYY HH:mm"))
    }
}

module.exports = UpdateEndDateEmbed