const fs = require("fs")
const path = require("path")

async function attachEvents(client) {
    const files = (await fs.promises.readdir(__dirname)).filter(filename => filename !== "index.js")

    files.forEach(filename => {
        let event = filename.replace(/(on|.js)/g, "")
        event = event.charAt(0).toLowerCase() + event.slice(1)

        const run = require(path.join(__dirname, filename))

        client.on(event, run)
    })
}

module.exports = attachEvents