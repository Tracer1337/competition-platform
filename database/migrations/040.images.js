module.exports = {
    table: "images",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "user_id varchar(255) NOT NULL",
        "project_id varchar(255) NOT NULL",
        "filename varchar(255)",
        "FOREIGN KEY (user_id) REFERENCES users(id)",
        "FOREIGN KEY (project_id) REFERENCES projects(id)"
    ]
}