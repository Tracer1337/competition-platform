const Discord = require("discord.js")
const { COLORS } = require("../../../config/constants.js")
const { makeURL } = require("../../utils")

class BaseEmbed extends Discord.MessageEmbed {
    constructor() {
        super()

        this.setColor(COLORS["PRIMARY"])
            .setTimestamp()
    }

    setUser(user) {
        return this.setAuthor(user.username, `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`, makeURL("/user/" + user.id))
    }
}

module.exports = BaseEmbed