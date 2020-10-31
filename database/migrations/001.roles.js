module.exports = {
    table: "roles",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "name varchar(255) NOT NULL UNIQUE"
    ]
}