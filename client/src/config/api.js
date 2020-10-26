import axios from "axios"

import format, {
    COMPETITION,
    COMPETITIONS,
    USER,
    PROJECTS
} from "./formatAPI.js"
import { API_BASE_URL } from "./constants.js"

export function setTokenHeader(token) {
    axios.defaults.headers.common = {
        "Authorization": "Baerer " + token
    }
}

function url(path) {
    return API_BASE_URL + path
}

export const getProfile = () => axios.get(url("/auth/profile")).then(format(USER))

export const getAllCompetitions = () => axios.get(url("/competitions")).then(format(COMPETITIONS))
export const getCompetition = (id) => axios.get(url("/competitions/" + id)).then(format(COMPETITION))
export const createCompetition = (body) => axios.post(url("/competitions"), body)
export const editCompetition = (id, body) => axios.post(url("/competitions/" + id), body)
export const deleteCompetition = (id) => axios.delete(url("/competitions/" + id))
export const getSubmissions = (id) => axios.get(url(`/competitions/${id}/submissions`)).then(format(PROJECTS))

export const getAllProjects = () => axios.get(url("/projects"))
export const createProject = (formData) => axios.post(url("/projects"), formData)
export const editProject = (id, body) => axios.post(url("/projects/" + id), body)
export const deleteProject = (id) => axios.delete(url("/projects/" + id))
export const voteForProject = (id) => axios.post(url("/projects/vote/" + id))
export const removeVoteFromProject = (id) => axios.post(url("/projects/vote/" + id))

export const getFileFromStorage = (filename) => axios.get(url("/storage/" + filename), { responseType: "blob" })