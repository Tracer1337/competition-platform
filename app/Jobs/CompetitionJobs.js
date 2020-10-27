const CronJob = require("cron").CronJob
const Competition = require("../Models/Competition.js")
const { COMPETITION_STATES } = require("../../config/constants.js")
const CompetitionServiceProvider = require("../Services/CompetitionServiceProvider.js")

const jobs = {}

function momentToCron(date) {
    return `${date.second()} ${date.minute()} ${date.hour()} ${date.date()} ${date.month()} ${date.day()}`
}

function createEndJob(model) {
    if (jobs[model.id]) {
        jobs[model.id].stop()
    }

    const job = new CronJob(momentToCron(model.end_at), async () => {
        console.log("Triggered")

        await CompetitionServiceProvider.endCompetition(model.id)

        job.stop()
        delete jobs[model.id]
    })

    jobs[model.id] = job

    job.start()
}

async function restoreJobs() {
    const models = await Competition.findAllBy("state", COMPETITION_STATES["OPEN"])

    models.forEach(model => {
        if (model.end_at) {
            createEndJob(model)
        }
    })
}

module.exports = { createEndJob, restoreJobs }