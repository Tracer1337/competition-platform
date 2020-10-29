const CompetitionCreateEmbed = require("../Embed/CompetitionCreateEmbed.js")
const AnnouncementServiceProvider = require("../Services/AnnouncementServiceProvider.js")

async function run(competition) {
    const embed = new CompetitionCreateEmbed({ competition })
    await AnnouncementServiceProvider.makeAnnouncement.call(this, embed)
}

module.exports = run