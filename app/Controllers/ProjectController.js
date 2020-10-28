const fs = require("fs")

const Project = require("../Models/Project.js")
const Competition = require("../Models/Competition.js")
const Image = require("../Models/Image.js")
const Vote = require("../Models/Vote.js")
const StorageFacade = require("../Facades/StorageFacade.js")
const FileServiceProvider = require("../Services/FileServiceProvider.js")
const CompetitionServiceProvider = require("../Services/CompetitionServiceProvider.js")
const DiscordBridge = require("../Discord/bridge.js")
const config = require("../../config")
const { COMPETITION_STATES } = require("../../config/constants.js")

async function deleteImages(req) {
    await Promise.all(Object.values(req.files).flat().map(image => fs.promises.unlink(image.path)))
}

async function getAll(req, res) {
    const models = await Project.findAllBy("user_id", req.user.id)
    res.send(models)
}

async function getOne(req, res) {
    const model = await Project.findBy("id", req.params.id)

    if (!model) {
        return res.status(404).end()
    }

    if (req.user) {
        await model.setHasVoted(req.user)
    }

    res.send(model)
}

async function create(req, res) {
    const competition = await Competition.findBy("id", req.body.competition_id)

    if (!competition) {
        await deleteImages(req)
        return res.status(400).send({ error: "Invalid competition id" })
    }

    if (competition.state !== COMPETITION_STATES["OPEN"]) {
        return res.status(403).send({ error: "The competition is not open" })
    }

    if (!(await CompetitionServiceProvider.canCreateProject(req.user, competition))) {
        return res.status(403).send({ error: "Already created a project for this competition" })
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

    await model.init()

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

    DiscordBridge.dispatchEvent("createProject", model)

    res.send(model)
}

async function update(req, res) {
    const model = await Project.findBy("id", req.params.id)

    if (!model) {
        await deleteImages(req)
        return res.status(404).end()
    }

    if (model.user_id !== req.user.id) {
        await deleteImages(req)
        return res.status(403).send()
    }

    if (req.files.images && model.images.length + req.files.images.length > config.projects.maxUploadImages) {
        await deleteImages(req)
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

async function removeImage(req, res) {
    const model = await Image.findBy("id", req.params.id)

    if (!model) {
        return res.status(404).end()
    }

    if (model.user_id !== req.user.id) {
        return res.status(403).end()
    }

    await model.delete()

    res.send(model)
}

async function vote(req, res) {
    const project = await Project.findBy("id", req.params.id)

    if (!project) {
        return res.status(404).end()
    }

    if (!(await CompetitionServiceProvider.canVoteForProject(req.user, project))) {
        return res.status(403).send({ error: "Already voted" })
    }

    const vote = new Vote({ user_id: req.user.id, project_id: project.id })
    await vote.store()

    res.end()
}

async function deleteVote(req, res) {
    const vote = (await Vote.where(`project_id = '${req.params.id}' AND user_id = '${req.user.id}'`))[0]
    
    if (!vote) {
        return res.status(404).end()
    }
    
    const project = await Project.findBy("id", req.params.id)
    const competition = await Competition.findBy("id", project.competition_id)

    if (competition.state !== COMPETITION_STATES["OPEN"]) {
        return res.status(403).end()
    }

    await vote.delete()

    res.end()
}

module.exports = { getAll, getOne, create, update, remove, removeImage, vote, deleteVote }