const Guild = require("../../Models/Guild.js")

class AnnouncementServiceProvider {
    static async makeAnnouncement(message) {
        const guilds = await Guild.getAll()
        
        await Promise.all(guilds.map(async ({ id, announcement_channel_id }) => {
            const guild = this.guilds.cache.get(id)

            if (guild) {
                const channel = guild.channels.cache.get(announcement_channel_id)

                if (channel) {
                    await channel.send(message)
                }
            }
        }))    
    }
}

module.exports = AnnouncementServiceProvider