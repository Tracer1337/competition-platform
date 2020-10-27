import moment from "moment"
import { DISCORD_CDN_BASE_URL, API_BASE_URL } from "./constants.js"

export const COMPETITION = "COMPETITION"
export const COMPETITIONS = "COMPETITIONS"
export const USER = "USER"
export const PROJECT = "PROJECT"
export const PROJECTS = "PROJECTS"

function getFileURL(filename) {
    return API_BASE_URL + "/storage/" + filename
}

function formatCompetition(data) {
    formatUser(data.user)

    data.created_at = moment(data.created_at)

    if (data.end_at) {
        data.end_at = moment(data.end_at)
    }

    if (data.winner_projects) {
        data.winner_projects.map(formatProject)
    }
}

function formatUser(data) {
    data.fullUsername = `${data.username}#${data.discriminator}`
    data.avatar_url = `${DISCORD_CDN_BASE_URL}/avatars/${data.id}/${data.avatar}`
}

function formatProject(data) {
    formatUser(data.user)

    data.images.map(formatImage)

    data.created_at = moment(data.created_at)
    data.file_url = getFileURL(data.filename)
}

function formatImage(data) {
    data.url = getFileURL(data.filename)
}

export default function format(type) {
    let fn

    if (type === COMPETITION) {
        fn = data => formatCompetition(data.data)
    } else if (type === COMPETITIONS) {
        fn = data => data.data.map(formatCompetition)
    } else if (type === USER) {
        fn = data => formatUser(data.data)
    } else if (type === PROJECT) {
        fn = data => formatProject(data.data)
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