const CompetitionEndEmbed = require("../Embed/CompetitionEndEmbed.js")
const AnnouncementServiceProvider = require("../Services/AnnouncementServiceProvider.js")

async function run() {
    const embed = new CompetitionEndEmbed(...arguments)
    await AnnouncementServiceProvider.makeAnnouncement.call(this, embed)
}

module.exports = run