const moment = require("moment")

const Competition = require("../Models/Competition.js")
const Project = require("../Models/Project.js")
const CompetitionJobs = require("../Jobs/CompetitionJobs.js")
const { COMPETITION_STATES } = require("../../config/constants.js")
const DiscordBridge = require("../Discord/Bridge.js")

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

    if (req.user) {
        await model.setHasSubmitted(req.user)
    }

    res.send(model)
}

async function getSubmissions(req, res) {
    const models = await Project.findAllBy("competition_id", req.params.id)

    if (req.user) {
        await models.mapAsync(model => model.setHasVoted(req.user))
    }

    models.sort((a, b) => b.votes - a.votes)

    return res.send(models)
}

async function create(req, res) {
    const model = new Competition({
        ...req.body,
        user_id: req.user.id
    })

    await model.init()

    await model.store()
    
    if (model.end_at) {
        await model.init()
        CompetitionJobs.createEndJob(model)
    }

    DiscordBridge.dispatchEvent("createCompetition", model)

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

    let prevEndDate = model.end_at && moment(model.end_at)

    model.columns.forEach(column => {
        if (req.body[column]) {
            model[column] = req.body[column]
        }
    })

    await model.init()
    
    await model.update()
    
    if (req.body.end_at) {
        if (prevEndDate) {
            DiscordBridge.dispatchEvent("updateEndDate", { competition: model, prevEndDate })
        } else {
            DiscordBridge.dispatchEvent("setEndDate", model)
        }

        if (model.state === COMPETITION_STATES["ENDED"]) {
            model.state = COMPETITION_STATES["OPEN"]
            await model.update()
        }

        CompetitionJobs.createEndJob(model)
    }

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

module.exports = { getAll, create, update, remove, getOne, getSubmissions }