import moment from "moment"

export const COMPETITION = "COMPETITION"
export const COMPETITIONS = "COMPETITIONS"
export const USER = "USER"
export const PROJECTS = "PROJECTS"

function formatCompetition(data) {
    formatUser(data.user)

    data.created_at = moment(data.created_at)

    if (data.end_at) {
        data.end_at = moment(data.end_at)
    }
}

function formatUser(data) {
    data.fullUsername = `${data.username}#${data.discriminator}`
}

function formatProject(data) {
    formatUser(data.user)
    formatCompetition(data.competition)

    data.created_at = moment(data.created_at)
}

export default function format(type) {
    let fn

    if (type === COMPETITION) {
        fn = data => formatCompetition(data.data)
    } else if (type === COMPETITIONS) {
        fn = data => data.data.map(formatCompetition)
    } else if (type === USER) {
        fn = data => formatUser(data.data)
    } else if (type === PROJECTS) {
        fn = data => data.data.map(formatProject)
    }

    return (data) => {
        return new Promise(resolve => {
            fn(data)
            resolve(data)
        })
    }
}