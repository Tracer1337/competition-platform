const { COMPETITION_STATES } = require("../../config/constants.js")

module.exports = {
    table: "competitions",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "user_id varchar(255) NOT NULL",
        "title varchar(255) NOT NULL",
        "briefing_text TEXT",
        "end_at varchar(255)",
        "state int NOT NULL DEFAULT " + COMPETITION_STATES["OPEN"],
        "created_at varchar(255) NOT NULL",
        "FOREIGN KEY (user_id) REFERENCES users(id)"
    ]
}