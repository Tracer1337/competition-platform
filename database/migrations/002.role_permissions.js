module.exports = {
    table: "role_permissions",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "role_id varchar(255) NOT NULL",
        "permission_id varchar(255) NOT NULL",
        "FOREIGN KEY (role_id) REFERENCES roles(id)",
        "FOREIGN KEY (permission_id) REFERENCES permissions(id)"
    ]
}