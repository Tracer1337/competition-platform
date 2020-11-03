const { queryAsync } = require("../utils/index.js")
const config = require("../../config")
const { COMPETITION_STATES } = require("../../config/constants.js")
const DiscordBridge = require("../Discord/Bridge.js")
const LevelServiceProvider = require("./LevelServiceProvider.js")

/**
 * A user can create a project if he has not created one yet
 */
async function canCreateProject(user, competition) {
    const project = (await Project.where(`user_id = '${user.id}' AND competition_id = '${competition.id}'`))[0]
    return !project
}

/**
 * A user can vote for a project if he has not voted for it already and he
 * has not used all of his votes
 */
async function canVoteForProject(user, project) {
    const competition = await Competition.findBy("id", project.competition_id)

    if (competition.state !== COMPETITION_STATES["OPEN"]) {
        return false
    }

    let amountOfVotesInCompetition = (await queryAsync(`
        SELECT COUNT(1) FROM votes 
        INNER JOIN projects ON votes.project_id = projects.id 
        INNER JOIN competitions ON projects.competition_id = competitions.id 
        WHERE competitions.id = '${project.competition_id}'
        AND votes.user_id = '${user.id}'
    `))[0]

    amountOfVotesInCompetition = Object.values(amountOfVotesInCompetition)[0]

    return (
        amountOfVotesInCompetition < config.competitions.maxVotesPerCompetition &&
        (await Vote.where(`project_id = '${project.id}' AND user_id = '${user.id}'`)).length === 0
    )
}

async function endCompetition(id) {
    const model = await Competition.findBy("id", id)
    
    console.log("Competition ended: ", model.title)

    model.state = COMPETITION_STATES["ENDED"]

    const projects = await Project.findAllBy("competition_id", id)
    const winnerUsers = []

    if (projects.length > 0) {
        let mostVotes = [projects[0]]
    
        for (let i = 1; i < projects.length; i++) {
            const project = projects[i]
            
            if (project.votes > mostVotes[0].votes) {
                mostVotes = [project]
            } else if (project.votes === mostVotes[0].votes) {
                mostVotes.push(project)
            }
        }
    
        model.winner_project_ids = mostVotes.map(project => project.id)

        mostVotes.map(project => winnerUsers.push(project.user))
    }

    await model.init()

    await model.update()

    DiscordBridge.dispatchEvent("endCompetition", model)
    
    await Promise.all(winnerUsers.map(user => {
        return LevelServiceProvider.addPoints(user, config.level.competitionWinnerPoints)
    }))
}

module.exports = { canCreateProject, canVoteForProject, endCompetition }

const Project = require("../Models/Project.js")
const Competition = require("../Models/Competition.js")
const Vote = require("../Models/Vote.js")