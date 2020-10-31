const fs = require("fs")
const path = require("path")

const COMMANDS_DIR = path.join(__dirname, "..", "commands")

class CommandServiceProvider {
    static parseDir(dir) {
        return dir.filter(filename => filename !== "index.js").map(filename => {
            const command = require(path.join(COMMANDS_DIR, filename))
            command.name = filename.replace(".js", "")
            return command
        })
    }

    static async getCommands() {
        const dir = await fs.promises.readdir(COMMANDS_DIR)
        return CommandServiceProvider.parseDir(dir)
    }

    static getCommandsSync() {
        return CommandServiceProvider.parseDir(fs.readdirSync(COMMANDS_DIR))
    }
}

module.exports = CommandServiceProvider