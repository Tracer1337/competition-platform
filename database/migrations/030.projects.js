module.exports = {
    table: "projects",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "user_id varchar(255) NOT NULL",
        "competition_id varchar(255) NOT NULL",
        "description TEXT",
        "filename varchar(255)",
        "created_at varchar(255) NOT NULL",
        "FOREIGN KEY (user_id) REFERENCES users(id)"
    ]
}