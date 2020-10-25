const { v4: uuid } = require("uuid")
const Model = require("../../lib/Model.js")

class Vote extends Model {
    constructor(values) {
        super({
            table: "votes",
            columns: ["id", "user_id", "project_id"],
            defaultValues: {
                id: () => uuid()
            },
            ...values
        })
    }

    toJSON() {
        return {
            id: this.id
        }
    }
}

Model.bind(Vote, "votes")

module.exports = Vote