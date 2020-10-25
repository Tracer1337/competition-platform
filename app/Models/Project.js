const { v4: uuid } = require("uuid")
const moment = require("moment")
const Model = require("../../lib/Model.js")
const User = require("../Models/User.js")
const Competition = require("./Competition.js")
const Image = require("./Image.js")
const StorageFacade = require("../Facades/StorageFacade.js")

class Project extends Model {
    constructor(values) {
        super({
            table: "projects",
            columns: ["id", "user_id", "competition_id", "description", "filename", "created_at"],
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
        this.competition = await Competition.findBy("id", this.competition_id)
        this.images = await Image.findAllBy("project_id", this.id)
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

        return super.delete()
    }

    toJSON() {
        return {
            id: this.id,
            user: this.user,
            competition: this.competition,
            images: this.images,
            description: this.description,
            filename: this.filename,
            created_at: this.created_at
        }
    }
}

Model.bind(Project, "projects")

module.exports = Project