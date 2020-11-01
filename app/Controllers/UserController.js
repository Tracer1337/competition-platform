const User = require("../Models/User.js")

async function getAll(req, res) {
    if (!req.user.can("get all users")) {
        return res.status(403).end()
    }
    
    const models = await User.getAll()

    models.sort((a, b) => b.created_at - a.created_at)
    
    res.send(models)
}

async function update(req, res) {
    if (!req.user.can("update any user")) {
        return res.status(403).end()
    }

    const model = await User.findBy("id", req.params.id)

    if (!model) {
        return res.status(404).end()
    }

    model.assign(req.body)

    await model.update()

    res.send(model)
}

async function remove(req, res) {
    if (!req.user.can("delete any user")) {
        return res.status(403).end()
    }

    const model = await User.findBy("id", req.params.id)

    if (!model) {
        return res.status(404).end()
    }

    await model.delete()

    res.send(model)
}

module.exports = { getAll, update, remove }