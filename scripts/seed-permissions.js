const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const { makeRunnable, run } = require("@m.moelter/task-runner")
require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

const createConnection = require("../database")

const permissionsSeeder = require("../database/seeders/000.permissions.js")
const rolesSeeder = require("../database/seeders/001.roles")

const runnable = makeRunnable(async () => {

    for (let seeder of [permissionsSeeder, rolesSeeder]) {
        await run(seeder.run, "Seeding table: " + chalk.bold(seeder.table))
    }
})

;(async () => {
    // Connect to database
    global.db = await createConnection()

    try {
        await runnable()
    } catch (error) {
        console.error(error)
    } finally {
        db.end()
    }
})()