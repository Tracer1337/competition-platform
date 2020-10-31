const fs = require("fs")
const path = require("path")

const Bridge = require("../Bridge.js")
const AnnouncementServiceProvider = require("../Services/AnnouncementServiceProvider.js")

async function attachEvents(client) {
    const files = (await fs.promises.readdir(__dirname)).filter(filename => filename !== "index.js")

    // Attach events from this folder
    files.forEach(filename => {
        let event = filename.replace(/(^on|.js$)/g, "")
        event = event.charAt(0).toLowerCase() + event.slice(1)

        const run = require(path.join(__dirname, filename)).bind(client)

        client.on(event, run)
        Bridge.addEventListener(event, run)
    })

    // Attach events for sending embeds
    fs.readdirSync(path.join(__dirname, "..", "Embed")).forEach(filename => {
        if (filename === "BaseEmbed.js") {
            return
        }

        const Embed = require("../Embed/" + filename)

        if (Embed.event) {
            Bridge.addEventListener(Embed.event, AnnouncementServiceProvider.sendEmbed.bind(client, Embed))
        }
    })
}

module.exports = attachEvents