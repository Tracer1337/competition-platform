const path = require("path")

function run(command, args, message) {
    try {
        const method = require(path.join(__dirname, command + ".js"))
        method(args, message)
    } catch {
        message.channel.send("Invalid command")
    }
}

module.exports = run