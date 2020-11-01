const BaseEmbed = require("./BaseEmbed.js")
const { makeURL } = require("../../utils")

class LevelUpEmbed extends BaseEmbed {
    static event = "levelUp"

    constructor({ user, newLevel }) {
        super()

        this.setTitle("Level Up")
            .setURL(makeURL("/users/" + user.id))
            .setUser(user)
            .setDescription(`<@${user.id}> is now level ${newLevel}!`)
    }
}

module.exports = LevelUpEmbed