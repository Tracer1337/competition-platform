const Guild = require("../../Models/Guild.js")

class AnnouncementServiceProvider {
    static getStrings(lang) {
        return require(`../Lang/${lang}.json`)
    }

    static async mapGuilds(fn) {
        const guilds = await Guild.getAll()
        
        await Promise.all(guilds.map(async (model) => {
            const guild = this.guilds.cache.get(model.id)
    
            if (guild) {
                guild.announcementChannel = guild.channels.cache.get(model.announcement_channel_id)
            
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

    static async sendEmbed(Embed, args) {
        await AnnouncementServiceProvider.mapGuilds.call(this, (guild, model) => {
            const strings = AnnouncementServiceProvider.getStrings(model.lang)
            const embed = new Embed(...[...args, strings])
            return guild.announcementChannel.send(embed)
        })
    }
}

module.exports = AnnouncementServiceProvider