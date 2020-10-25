module.exports = {
    table: "competitions",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "user_id varchar(255) NOT NULL",
        "briefing_text TEXT",
        "end_at varchar(255)",
        "created_at varchar(255) NOT NULL",
        "FOREIGN KEY (user_id) REFERENCES users(id)"
    ]
}