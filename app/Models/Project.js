const { v4: uuid } = require("uuid")
const moment = require("moment")
const Model = require("../../lib/Model.js")
const Image = require("./Image.js")
const Vote = require("./Vote.js")
const StorageFacade = require("../Facades/StorageFacade.js")

let Competition
let User

class Project extends Model {
    constructor(values) {
        super({
            table: "projects",
            columns: ["id", "user_id", "competition_id", "description", "filename", "project_url", "created_at"],
            defaultValues: {
                id: () => uuid(),
                created_at: () => moment()
            },
            ...values
        })

        this.hasVoted = null

        User = require("../Models/User.js")
        Competition = require("./Competition.js")
    }

    async init() {
        this.created_at = moment(this.created_at)
        this.user = await User.findBy("id", this.user_id)
        this.images = await Image.findAllBy("project_id", this.id)
        this.votes = (await Vote.findAllBy("project_id", this.id)).length
    }

    async setHasVoted(user) {
        const vote = await Vote.where(`project_id = '${this.id}' AND user_id = '${user.id}'`)
        this.hasVoted = !!vote[0]
    }

    getColumns() {
        const values = super.getColumns()
        values.created_at = values.created_at.format()
        return values
    }

    async delete() {
        if (this.filename) {
            await StorageFacade.deleteFileLocal(this.filename)
        }

        await Promise.all(this.images.map(image => image.delete()))

        const votes = await Vote.findAllBy("project_id", this.id)
        await Promise.all(votes.map(vote => vote.delete()))

        return super.delete()
    }

    toJSON() {
        return {
            id: this.id,
            user: this.user,
            competition_id: this.competition_id,
            images: this.images,
            votes: this.votes,
            hasVoted: this.hasVoted,
            description: this.description,
            filename: this.filename,
            project_url: this.project_url,
            created_at: this.created_at
        }
    }
}

Model.bind(Project, "projects")

module.exports = Project