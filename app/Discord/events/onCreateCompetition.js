const CompetitionCreateEmbed = require("../Embed/CompetitionCreateEmbed.js")
const AnnouncementServiceProvider = require("../Services/AnnouncementServiceProvider.js")

async function run() {
    const embed = new CompetitionCreateEmbed(...arguments)
    await AnnouncementServiceProvider.makeAnnouncement.call(this, embed)
}

module.exports = run