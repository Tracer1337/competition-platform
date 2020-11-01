const Guild = require("../../Models/Guild.js")
const RoleServiceProvider = require("../Services/RoleServiceProvider.js")
const { makeLevelRoleName } = require("../utils")
const config = require("../../../config")

async function run({ user, prevLevel, newLevel }) {
    const models = await Guild.getAll()

    const prevRoleName = makeLevelRoleName(prevLevel)
    const newRoleName = makeLevelRoleName(newLevel)

    await Promise.all(models.map(async model => {
        const guild = await this.guilds.fetch(model.id)

        await RoleServiceProvider.removeRoleFromUser(guild, prevRoleName, user)
        
        await RoleServiceProvider.createAssignRole(guild, {
            name: newRoleName,
            color: config.level.roleColor
        }, user)
    }))
}

module.exports = run