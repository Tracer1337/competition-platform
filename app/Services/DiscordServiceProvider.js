const fetch = require("node-fetch")
const config = require("../../config")

function requestToken(code) {
    // https://discord.com/api/oauth2/authorize?client_id=769821807770861568&redirect_uri=https%3A%2F%2Fbfc44f583e5e.ngrok.io%2Fapi%2Fauth%2Fdiscord&response_type=code&scope=identify

    return new Promise((resolve, reject) => {
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }

        const body = {
            client_id: process.env.DISCORD_API_CLIENT_ID,
            client_secret: process.env.DISCORD_API_CLIENT_SECRET,
            grant_type: "authorization_code",
            code,
            redirect_uri: `https://bfc44f583e5e.ngrok.io/api/auth/discord`,
            // redirect_uri: `${process.env.HOST}:${process.env.PORT}/api/auth/discord`,
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

function getUser(token) {
    return new Promise((resolve, reject) => {
        fetch(config.discord.api.basename + "/users/@me", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then(res => {
            if (res.status !== 200) {
                reject()
            }

            return res.json()
        })
        .then(resolve)
    })
}

module.exports = { requestToken, getUser }