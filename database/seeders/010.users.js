const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") })

module.exports = {
    table: "users",

    run: async () => {}
}