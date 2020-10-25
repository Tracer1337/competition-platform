module.exports = {
    table: "users",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "created_at varchar(255) NOT NULL",
        "is_admin bit(1) NOT NULL DEFAULT 0"
    ]
}