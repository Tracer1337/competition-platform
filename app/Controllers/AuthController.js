const DiscordServiceProvider = require("../Services/DiscordServiceProvider.js")
const User = require("../Models/User.js")
const Role = require("../Models/Role.js")
const DiscordBridge = require("../Discord/Bridge.js")

async function oauthDiscord(req, res) {
    try {
        const data = await DiscordServiceProvider.requestToken(req.query.code)

        const { access_token: token } = data

        const userData = await DiscordServiceProvider.getProfile(token)
        let user = await User.findBy("id", userData.id)

        if (!user) {
            const role = await Role.findBy("name", "User")

            user = new User({
                ...userData,
                role_id: role.id
            })

            await user.init()
            
            await user.store()
            
            DiscordBridge.dispatchEvent("registerUser", user)
        }

        res.render("oauth-receiver", { error: false, data: { token, user } })
    } catch (error) {
        res.render("oauth-receiver", { error: true })
    }
}

async function getProfile(req, res) {
    res.send(req.user)
}

module.exports = { oauthDiscord, getProfile }