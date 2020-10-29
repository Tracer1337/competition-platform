module.exports = {
    table: "guilds",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "announcement_channel_id varchar(255)",
        "lang varchar(255) NOT NULL"
    ]
}