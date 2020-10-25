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
                username: userData.username,
                avatar_id: userData.avatar
            })
            await user.store()
        }

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