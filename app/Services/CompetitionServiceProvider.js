const Vote = require("../Models/Vote.js")
const { queryAsync } = require("../utils/index.js")
const config = require("../../config")
const { COMPETITION_STATES } = require("../../config/constants.js")

let Project
let Competition

function initVars() {
    if (!Project) {
        Project = require("../Models/Project.js")
    }

    if (!Competition) {
        Competition = require("../Models/Competition.js")
    }
}

/**
 * A user can create a project if he has not created one yet
 */
async function canCreateProject(user, competition) {
    initVars()

    const project = (await Project.where(`user_id = '${user.id}' AND competition_id = '${competition.id}'`))[0]
    return !project
}

/**
 * A user can vote for a project if he has not voted for it already and he
 * has not used all of his votes
 */
async function canVoteForProject(user, project) {
    initVars()

    let amountOfVotesInCompetition = (await queryAsync(`
        SELECT COUNT(1) FROM votes 
        INNER JOIN projects ON votes.project_id = projects.id 
        INNER JOIN competitions ON projects.competition_id = competitions.id 
        WHERE competitions.id = '${project.competition_id}'
    `))[0]

    amountOfVotesInCompetition = Object.values(amountOfVotesInCompetition)[0]

    return (
        amountOfVotesInCompetition < config.competitions.maxVotesPerCompetition &&
        (await Vote.where(`project_id = '${project.id}' AND user_id = '${user.id}'`)).length === 0
    )
}

async function endCompetition(id) {
    initVars()

    const model = await Competition.findBy("id", id)

    model.state = COMPETITION_STATES["ENDED"]

    const projects = await Project.findAllBy("competition_id", id)

    if (projects.length > 0) {
        let winner = projects[0]
    
        projects.forEach(project => {
            if (project.votes > winner.votes) {
                winner = project
            }
        })
    
        model.winner_project_id = winner.id
    }

    await model.update()
}

module.exports = { canCreateProject, canVoteForProject, endCompetition }