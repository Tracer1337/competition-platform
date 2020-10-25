const DiscordServiceProvider = require("../Services/DiscordServiceProvider.js")

async function oauthDiscord(req, res) {
    try {
        const data = await DiscordServiceProvider.requestToken(req.query.code)

        const { access_token: token } = data

        const user = await DiscordServiceProvider.getUser(token)

        res.send({ token, user })
    } catch (error) {
        console.error(error)
        res.send({})
    }
}

async function getProfile(req, res) {
    res.send(req.user)
}

module.exports = { oauthDiscord, getProfile }