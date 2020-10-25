const fs = require("fs")

const Project = require("../Models/Project.js")
const Competition = require("../Models/Competition.js")
const StorageFacade = require("../Facades/StorageFacade.js")
const { randomFileName, getFileExtension } = require("../utils")

async function getAll(req, res) {
    const models = await Project.findBy("user_id", req.user.id)
    res.send(models)
} 

async function create(req, res) {
    if (!(await Competition.findBy("id", req.body.competition_id))) {
        return res.status(400).send({ error: "Invalid competition id" })
    }

    const model = new Project({
        ...req.body,
        user_id: req.user.id
    })

    if (req.file) {
        try {
            const filename = randomFileName() + getFileExtension(req.file.filename)
            await StorageFacade.uploadFileLocal(req.file.path, filename)
            model.filename = filename
        } catch (error) {
            console.error(error)
        } finally {
            await fs.promises.unlink(req.file.path)
        }
    }

    await model.store()

    res.send(model)
}

async function update(req, res) {
    const model = await Project.findBy("id", req.params.id)

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

    if (req.file) {
        try {
            await StorageFacade.deleteFileLocal(model.filename)
            const newFilename = randomFileName() + getFileExtension(req.file.filename)
            await StorageFacade.uploadFileLocal(req.file.path, newFilename)
            model.filename = newFilename
        } catch (error) {
            console.error(error)
        } finally {
            await fs.promises.unlink(req.file.path)
        }
    }

    await model.update()

    res.send(model)
}

async function remove(req, res) {
    const model = await Project.findBy("id", req.params.id)

    if (!model) {
        return res.status(404).end()
    }

    if (model.user_id !== req.user.id) {
        return res.status(403).send()
    }

    await model.delete()

    res.send(model)
}

module.exports = { getAll, create, update, remove }