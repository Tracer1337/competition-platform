module.exports = {
    table: "users",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "username varchar(255) NOT NULL",
        "discriminator varchar(255) NOT NULL",
        "avatar varchar(255) NOT NULL",
        "created_at varchar(255) NOT NULL",
        "role_id varchar(255) NOT NULL",
        "points int NOT NULL DEFAULT 0",
        "FOREIGN KEY (role_id) REFERENCES roles(id)"
    ]
}