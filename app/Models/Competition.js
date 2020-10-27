const { v4: uuid } = require("uuid")
const moment = require("moment")
const Model = require("../../lib/Model.js")
const User = require("../Models/User.js")
const Project = require("../Models/Project.js")

class Competition extends Model {
    constructor(values) {
        super({
            table: "competitions",
            columns: ["id", "user_id", "title", "briefing_text", "state", "winner_project_id", "end_at", "created_at"],
            defaultValues: {
                id: () => uuid(),
                created_at: () => moment()
            },
            ...values
        })

        this.hasSubmitted = null
    }

    async init() {
        if (this.end_at) {
            this.end_at = moment(this.end_at)
        }
        
        this.created_at = moment(this.created_at)
        this.user = await User.findBy("id", this.user_id)
    }

    async setHasSubmitted(user) {
        const project = await Project.where(`competition_id = '${this.id}' AND user_id = '${user.id}'`)
        this.hasSubmitted = !!project[0]
    }

    getColumns() {
        const values = super.getColumns()
        values.created_at = values.created_at.format()

        if (values.end_at) {
            values.end_at = values.end_at.format()
        }

        return values
    }

    toJSON() {
        return {
            id: this.id,
            user: this.user,
            hasSubmitted: this.hasSubmitted,
            title: this.title,
            briefing_text: this.briefing_text,
            state: this.state,
            winner_project_id: this.winner_project_id,
            end_at: this.end_at,
            created_at: this.created_at
        }
    }
}

Model.bind(Competition, "competitions")

module.exports = Competition