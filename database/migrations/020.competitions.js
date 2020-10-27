const { COMPETITION_STATES } = require("../../config/constants.js")

module.exports = {
    table: "competitions",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "user_id varchar(255) NOT NULL",
        "title varchar(255) NOT NULL",
        "briefing_text TEXT",
        `state varchar(255) NOT NULL DEFAULT '${COMPETITION_STATES["OPEN"]}'`,
        "winner_project_id varchar(255)",
        "end_at varchar(255)",
        "created_at varchar(255) NOT NULL",
        "FOREIGN KEY (user_id) REFERENCES users(id)"
    ]
}