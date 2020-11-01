const config = require("../../config")
const DiscordBridge = require("../Discord/Bridge.js")

function getLevelDetails(points) {
    let requiredPoints = config.level.firstLevelPointsRequired
    let level = 1

    while (points >= requiredPoints) {
        level++
        points -= requiredPoints
        requiredPoints = Math.min(requiredPoints + config.level.pointsIncrement, config.level.maxPointsRequired)
    }

    return [level, requiredPoints, points]
}

function getLevel(points) {
    return getLevelDetails(points)[0]
}

async function addPoints(user, points) {
    const prevLevel = getLevel(user.points)
    
    user.points += points

    const newLevel = getLevel(user.points)

    if (newLevel > prevLevel) {
        DiscordBridge.dispatchEvent("levelUp", { user, prevLevel, newLevel })
    }
    
    await user.update()
}

module.exports = { getLevelDetails, getLevel, addPoints }