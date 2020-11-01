class RoleServiceProvider {
    static async getRole(guild, roleName) {
        const roles = await guild.roles.fetch()

        let role

        for (let [id, _role] of roles.cache) {
            if (_role.name === roleName) {
                role = _role
                break
            }
        }

        return role
    }

    static createRole(guild, { name, color }) {
        return guild.roles.create({
            data: {
                name: name,
                color: color
            },
            reason: "Automated level role generation"
        })
    }

    static async assignRole(guild, user, role) {
        const guildMember = await guild.members.fetch(user.id)
        await guildMember.roles.add(role, "Automated level role assignment")
    }

    static async removeRoleFromUser(guild, roleName, user) {
        console.log("Remove role", roleName)
        const role = await RoleServiceProvider.getRole(guild, roleName)

        const guildMember = await guild.members.fetch(user.id)
        await guildMember.roles.remove(role)
    }

    static async createAssignRole(guild, { name, color }, user) {
        console.log("Assign role", name)
        let role = await RoleServiceProvider.getRole(guild, name)

        if (!role) {
            role = await RoleServiceProvider.createRole(guild, { name, color })
        }

        await RoleServiceProvider.assignRole(guild, user, role)
    }
}

module.exports = RoleServiceProvider