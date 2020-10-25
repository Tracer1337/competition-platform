const DiscordServiceProvider = require("../Services/DiscordServiceProvider.js")
const User = require("../Models/User.js")

async function oauthDiscord(req, res) {
    try {
        const data = await DiscordServiceProvider.requestToken(req.query.code)

        const { access_token: token } = data

        const userData = await DiscordServiceProvider.getUser(token)
        let user = await User.findBy("id", userData.id)

        if (!user) {
            user = new User({
                id: userData.id,
                username: userData.username
            })

            user.setData(data)

            await user.store()
        }

        res.render("oauth-receiver", { error: false, data: { token, user: userData } })
    } catch {
        res.render("oauth-receiver", { error: true })
    }
}

async function getProfile(req, res) {
    res.send(req.user)
}

module.exports = { oauthDiscord, getProfile }