const DiscordServiceProvider = require("../Services/DiscordServiceProvider.js")
const User = require("../Models/User.js")
const DiscordBridge = require("../Discord/Bridge.js")

async function oauthDiscord(req, res) {
    try {
        const data = await DiscordServiceProvider.requestToken(req.query.code)

        const { access_token: token } = data

        const userData = await DiscordServiceProvider.getProfile(token)
        let user = await User.findBy("id", userData.id)

        if (!user) {
            user = new User(userData)

            await user.store()
        }

        DiscordBridge.dispatchEvent("loginUser", user)

        res.render("oauth-receiver", { error: false, data: { token, user } })
    } catch (error) {
        console.error(error)

        res.render("oauth-receiver", { error: true })
    }
}

async function getProfile(req, res) {
    res.send(req.user)
}

module.exports = { oauthDiscord, getProfile }