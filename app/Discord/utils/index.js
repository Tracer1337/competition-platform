const config = require("../../../config")

function makeLevelRoleName(level) {
    return config.level.roleName.replace(/{}/g, level)
}

function makeCodeblock(str) {
    return "```\n" + str + "```"
}

module.exports = { makeLevelRoleName, makeCodeblock }