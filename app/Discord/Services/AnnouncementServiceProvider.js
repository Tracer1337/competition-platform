const { mapGuilds } = require("../utils")

class AnnouncementServiceProvider {
    static getStrings(lang) {
        return require(`../Lang/${lang}.json`)
    }
    
    static async makeAnnouncement(message) {
        await mapGuilds.call(this, guild => {
            return guild.announcementChannel.send(message)
        })
    }

    static async sendEmbed(Embed, ...args) {
        await mapGuilds.call(this, async (guild, model) => {
            const strings = AnnouncementServiceProvider.getStrings(model.lang)

            const params = [...args, strings, model.lang]
            let embed

            if (Embed.makeEmbed) {
                embed = await Embed.makeEmbed(...params)
            } else {
                embed = new Embed(...params)
            }

            await guild.announcementChannel.send(embed)
        })
    }
}

module.exports = AnnouncementServiceProvider