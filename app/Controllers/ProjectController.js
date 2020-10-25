const Project = require("../Models/Project.js")
const Competition = require("../Models/Competition.js")
const Image = require("../Models/Image.js")
const StorageFacade = require("../Facades/StorageFacade.js")
const FileServiceProvider = require("../Services/FileServiceProvider.js")
const config = require("../../config")

async function getAll(req, res) {
    const models = await Project.findAllBy("user_id", req.user.id)
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

    if (req.files.file) {
        const filename = await FileServiceProvider.storeLocal(req.files.file[0])

        if (filename) {
            model.filename = filename
        }
    }

    await model.store()

    if (req.files.images) {
        await Promise.all(req.files.images.map(async (file) => {
            const filename = await FileServiceProvider.storeLocal(file)

            if (filename) {
                const image = new Image({
                    user_id: req.user.id,
                    project_id: model.id,
                    filename
                })

                await image.store()
            }
        }))
    }

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

    if (req.files.images && model.images.length + req.files.images.length > config.projects.maxUploadImages) {
        return res.status(400).send({ error: "Too many images" })
    }

    model.columns.forEach(column => {
        if (req.body[column]) {
            model[column] = req.body[column]
        }
    })

    if (req.files.file) {
        await StorageFacade.deleteFileLocal(model.filename)
        const filename = await FileServiceProvider.storeLocal(req.files.file[0])

        if (filename) {
            model.filename = filename
        }
    }

    if (req.files.images) {
        await Promise.all(req.files.images.map(async (file) => {
            const filename = await FileServiceProvider.storeLocal(file)

            if (filename) {
                const image = new Image({
                    user_id: req.user.id,
                    project_id: model.id,
                    filename
                })

                await image.store()
            }
        }))

        await model.init()
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