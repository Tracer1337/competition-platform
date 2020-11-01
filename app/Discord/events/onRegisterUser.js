const AnnouncementServiceProvider = require("../Services/AnnouncementServiceProvider.js")
const RoleServiceProvider = require("../Services/RoleServiceProvider.js")
const { makeLevelRoleName, mapGuilds } = require("../utils")
const config = require("../../../config")

async function run(user) {
    await mapGuilds.call(this, (guild) => {
        return RoleServiceProvider.createAssignRole(guild, {
            name: makeLevelRoleName(user.level),
            color: config.level.roleColor
        }, user)
    })
    
    await AnnouncementServiceProvider.makeAnnouncement.call(this, `New user: <@${user.id}>`)
}

module.exports = run