const fs = require("fs")
const path = require("path")

const COMMANDS_DIR = path.join(__dirname, "..", "commands")
const LANGUAGES_DIR = path.join(__dirname, "..", "Lang")

class DirectoryServiceProvider {
    static parseCommandsDir(dir) {
        return dir.filter(filename => filename !== "index.js").map(filename => {
            const command = require(path.join(COMMANDS_DIR, filename))
            command.name = filename.replace(".js", "")
            return command
        })
    }

    static async getCommands() {
        const dir = await fs.promises.readdir(COMMANDS_DIR)
        return DirectoryServiceProvider.parseCommandsDir(dir)
    }

    static getCommandsSync() {
        return DirectoryServiceProvider.parseCommandsDir(fs.readdirSync(COMMANDS_DIR))
    }

    static getLanguagesSync() {
        return fs.readdirSync(LANGUAGES_DIR).map(lang => lang.replace(".json", ""))
    }
}

module.exports = DirectoryServiceProvider