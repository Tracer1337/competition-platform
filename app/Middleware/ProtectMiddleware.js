const DiscordServiceProvider = require("../Services/DiscordServiceProvider.js")
const User = require("../Models/User.js")

/**
 * Convert the given token to a user object
 */
async function ProtectMiddleware(req, res, next) {
    if (!req.header("Authorization")) {
        return res.sendStatus(401)
    }

    const token = req.header("Authorization").split(" ")[1]

    try {
        const data = await DiscordServiceProvider.getProfile(token)
        const user = await User.findBy("id", data.id)
    
        if (!user) {
            throw new Error()
        }
    
        req.user = user
    } catch {
        return res.status(401).send({ error: "Invalid token" })
    }

    next()
}

function Admin(req, res, next) {
    ProtectMiddleware(req, res, () => {
        if (!req.user.is_admin) {
            return res.sendStatus(403)
        }

        next()
    })
}

Object.assign(ProtectMiddleware, { Admin })

module.exports = ProtectMiddleware 