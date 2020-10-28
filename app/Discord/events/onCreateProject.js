const Guild = require("../../Models/Guild.js")
const Competition = require("../../Models/Competition.js")

async function run(project) {
    const competition = await Competition.findBy("id", project.competition_id)

    const guilds = await Guild.getAll()

    await Promise.all(guilds.map(async ({ id, announcement_channel_id }) => {
        const guild = this.guilds.cache.get(id)

        if (guild) {
            const channel = guild.channels.cache.get(announcement_channel_id)

            if (channel) {
                await channel.send(`${project.user.username} has submitted a project to ${competition.title}`)
            }
        }
    }))
}

module.exports = run