const fetch = require("node-fetch")
const config = require("../../config")
const { makeURL } = require("../utils")

function requestToken(code) {
    return new Promise((resolve, reject) => {
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }

        const body = {
            client_id: process.env.DISCORD_API_CLIENT_ID,
            client_secret: process.env.DISCORD_API_CLIENT_SECRET,
            grant_type: "authorization_code",
            code,
            redirect_uri: makeURL("/api/auth/discord"),
            scope: "identify"
        }

        fetch(config.discord.api.basename + "/oauth2/token", {
            method: "POST",
            headers,
            body: new URLSearchParams(body) 
        })
            .then(res => res.json())
            .then(resolve)
            .catch(reject)
    })
}

function getProfile(token) {
    return new Promise((resolve, reject) => {
        fetch(config.discord.api.basename + "/users/@me", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    return reject(res)
                }

                return res.json()
            })
            .then(resolve)
    })
}

module.exports = { requestToken, getProfile }