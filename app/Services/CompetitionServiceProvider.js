const Vote = require("../Models/Vote.js")
const { queryAsync } = require("../utils/index.js")
const config = require("../../config")

let Project

function initVars() {
    Project = require("../Models/Project.js")
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

module.exports = { canCreateProject, canVoteForProject }