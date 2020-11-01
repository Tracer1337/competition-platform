const { v4: uuid } = require("uuid")
const Model = require("../../lib/Model.js")
const StorageFacade = require("../Facades/StorageFacade.js")

class Image extends Model {
    constructor(values) {
        super({
            table: "images",
            columns: ["id", "user_id", "project_id", "filename"],
            defaultValues: {
                id: () => uuid()
            },
            ...values
        })
    }

    async delete() {
        if (this.filename) {
            await StorageFacade.deleteFileLocal(this.filename)
        }

        return super.delete()
    }

    toJSON() {
        return {
            id: this.id,
            filename: this.filename
        }
    }
}

Model.bind(Image, "images")

module.exports = Image