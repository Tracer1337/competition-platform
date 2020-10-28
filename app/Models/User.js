const moment = require("moment")
const Model = require("../../lib/Model.js")

class User extends Model {
    constructor(values) {
        super({
            table: "users",
            columns: ["id", "username", "discriminator", "avatar", "created_at", "is_admin"],
            defaultValues: {
                created_at: () => moment()
            },
            ...values
        })
    }

    async init() {
        this.created_at = moment(this.created_at)
        
        if (Buffer.isBuffer(this.is_admin)) {
            this.is_admin = !!this.is_admin[0]
        }
    }

    getColumns() {
        const values = super.getColumns()
        values.created_at = values.created_at.format()
        return values
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            discriminator: this.discriminator,
            avatar: this.avatar,
            created_at: this.created_at
        }
    }
}

Model.bind(User, "users")

module.exports = User