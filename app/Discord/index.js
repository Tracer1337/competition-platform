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

        client.login(process.env.DISCORD_BOT_TOKEN)

        resolve()
    })
}

if (require.main === module) {
    const path = require("path")
    require("dotenv").config({ path: path.join(__dirname, "..", ".env") })
    
    run()
}

module.exports = run