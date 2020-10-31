const chalk = require("chalk")
const Discord = require("discord.js")

const attachEvents = require("./events")

const client = new Discord.Client()

function run() {
    return new Promise(async resolve => {
        client.once("ready", () => {
            resolve()
            console.log(chalk.green("Discord bot is running"))
        })

        await attachEvents(client)

        await client.login(process.env.DISCORD_BOT_TOKEN)
        
        // require("./Bridge.js").dispatchEvent("createProject", (await require("../Models/Project.js").getAll())[0])

        resolve()
    })
}

if (require.main === module) {
    const path = require("path")
    require("dotenv").config({ path: path.join(__dirname, "..", ".env") })
    
    run()
}

module.exports = run