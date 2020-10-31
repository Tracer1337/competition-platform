const Guild = require("../../Models/Guild.js")

class AnnouncementServiceProvider {
    static getStrings(lang) {
        return require(`../Lang/${lang}.json`)
    }

    static async mapGuilds(fn) {
        const guilds = await Guild.getAll()
        
        await Promise.all(guilds.map(async (model) => {
            const guild = await this.guilds.fetch(model.id)
            
            if (guild) {
                guild.announcementChannel = await this.channels.fetch(model.announcement_channel_id)
            
                if (guild.announcementChannel) {
                    await fn.call(this, guild, model)
                }
            }
        }))    
    }
    
    static async makeAnnouncement(message) {
        await AnnouncementServiceProvider.mapGuilds.call(this, guild => {
            return guild.announcementChannel.send(message)
        })
    }

    static async sendEmbed(Embed, ...args) {
        await AnnouncementServiceProvider.mapGuilds.call(this, async (guild, model) => {
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