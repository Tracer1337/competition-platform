const SetEndDateEmbed = require("../Embed/SetEndDateEmbed.js")
const AnnouncementServiceProvider = require("../Services/AnnouncementServiceProvider.js")

async function run() {
    const embed = new SetEndDateEmbed(...arguments)
    await AnnouncementServiceProvider.makeAnnouncement.call(this, embed)
}

module.exports = run