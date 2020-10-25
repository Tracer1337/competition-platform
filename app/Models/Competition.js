const { v4: uuid } = require("uuid")
const moment = require("moment")
const Model = require("../../lib/Model.js")
const User = require("../Models/User.js")

class Competition extends Model {
    constructor(values) {
        super({
            table: "competitions",
            columns: ["id", "user_id", "title", "briefing_text", "end_at", "created_at"],
            defaultValues: {
                id: () => uuid(),
                created_at: () => moment()
            },
            ...values
        })
    }

    async init() {
        this.created_at = moment(this.created_at)
        this.user = await User.findBy("id", this.user_id)
    }

    getColumns() {
        const values = super.getColumns()
        values.created_at = values.created_at.format()
        return values
    }

    toJSON() {
        return {
            id: this.id,
            user: this.user,
            briefing_text: this.briefing_text,
            end_at: this.end_at,
            created_at: this.created_at
        }
    }
}

Model.bind(Competition, "competitions")

module.exports = Competition