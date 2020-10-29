const CompetitionCreateEmbed = require("../Embed/CompetitionCreateEmbed.js")
const AnnouncementServiceProvider = require("../Services/AnnouncementServiceProvider.js")

async function run() {
    await AnnouncementServiceProvider.sendEmbed.call(this, CompetitionCreateEmbed, arguments)
}

module.exports = run