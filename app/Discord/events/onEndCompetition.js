const CompetitionEndEmbed = require("../Embed/CompetitionEndEmbed.js")
const AnnouncementServiceProvider = require("../Services/AnnouncementServiceProvider.js")

async function run() {
    await AnnouncementServiceProvider.sendEmbed.call(this, CompetitionEndEmbed, arguments)
}

module.exports = run