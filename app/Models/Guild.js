const Model = require("../../lib/Model.js")

class Guild extends Model {
    constructor(values) {
        super({
            table: "guilds",
            columns: ["id", "announcement_channel_id", "lang"],
            defaultValues: {
                lang: "en"
            },
            ...values
        })
    }

    toJSON() {
        return {
            id: this.id,
            announcement_channel_id: this.announcement_channel_id,
            lang: this.lang
        }
    }
}

Model.bind(Guild, "guilds")

module.exports = Guild