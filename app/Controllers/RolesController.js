const Role = require("../Models/Role.js")

async function getAll(req, res) {
    if (!req.user.can("get all roles")) {
        return res.status(403).end()
    }

    const models = await Role.getAll()

    res.send(models)
}

module.exports = { getAll }