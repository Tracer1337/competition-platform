const User = require("../../Models/User.js")
const LevelServiceProvider = require("../../Services/LevelServiceProvider.js")
const RoleServiceProvider = require("../Services/RoleServiceProvider.js")
const { makeLevelRoleName } = require("../utils")
const config = require("../../../config")

const levelRoleNameRegex = new RegExp(`^${config.level.roleName.replace(/{}/g, "\\d+")}$`)

async function run(args, message) {
    const users = await User.getAll()

    await Promise.all(users.map(async user => {
        let member
        try {
            member = await message.guild.members.fetch(user.id)
        } catch {
            return
        }

        const newRoles = member.roles.cache.filter(role => !levelRoleNameRegex.test(role.name))
        
        await member.roles.set(newRoles)
        
        const level = LevelServiceProvider.getLevel(user.points)
        const levelRole = makeLevelRoleName(level)

        await RoleServiceProvider.createAssignRole(message.guild, {
            name: levelRole,
            color: config.level.roleColor
        }, user)
    }))
}

module.exports = {
    run,
    desc: "Removes and reasigns all roles which are handled by the bot. Useful when some users got roles they aren't supposed to have.",
    usage: "reasign-roles",
    alias: [],
    permissions: ["MANAGE_ROLES"]
}