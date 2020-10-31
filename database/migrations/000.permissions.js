module.exports = {
    table: "permissions",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "name varchar(255) NOT NULL UNIQUE"
    ]
}