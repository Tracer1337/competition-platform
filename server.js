require("dotenv").config()
const express = require("express")
const chalk = require("chalk")

const boot = require("./app/Boot/Boot.js")

const app = express()

;(async () => {
    await boot(app)

    // Start server on port specified in .env
    app.listen(process.env.PORT, () => {
        console.log(chalk.green("Server is running on port " + process.env.PORT))
    })
})()