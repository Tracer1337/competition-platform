const Competition = require("../Models/Competition.js")

async function getAll(req, res) {
    const models = await Competition.getAll()

    models.sort((a, b) => b.created_at - a.created_at)

    res.send(models)
}

async function getOne(req, res) {
    const model = await Competition.findBy("id", req.params.id)
    
    if (!model) {
        return res.status(404).end()
    }

    res.send(model)
}

async function create(req, res) {
    const model = new Competition({
        ...req.body,
        user_id: req.user.id
    })

    await model.store()

    res.send(model)
}

async function update(req, res) {
    const model = await Competition.findBy("id", req.params.id)

    if (!model) {
        return res.status(404).end()
    }

    if (model.user_id !== req.user.id) {
        return res.status(403).send()
    }

    model.columns.forEach(column => {
        if (req.body[column]) {
            model[column] = req.body[column]
        }
    })

    await model.update()

    res.send(model)
}

async function remove(req, res) {
    const model = await Competition.findBy("id", req.params.id)

    if (!model) {
        return res.status(404).end()
    }

    if (model.user_id !== req.user.id) {
        return res.status(403).send()
    }

    await model.delete()

    res.send(model)
}

module.exports = { getAll, create, update, remove, getOne }