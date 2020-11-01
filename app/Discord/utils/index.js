const Guild = require("../../Models/Guild.js")
const config = require("../../../config")

function makeLevelRoleName(level) {
    return config.level.roleName.replace(/{}/g, level)
}

function makeCodeblock(str) {
    return "```\n" + str + "```"
}

async function mapGuilds(fn) {
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

module.exports = { makeLevelRoleName, makeCodeblock, mapGuilds }