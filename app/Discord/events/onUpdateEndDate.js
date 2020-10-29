const UpdateEndDateEmbed = require("../Embed/UpdateEndDateEmbed.js")
const AnnouncementServiceProvider = require("../Services/AnnouncementServiceProvider.js")

async function run() {
    const embed = new UpdateEndDateEmbed(...arguments)
    await AnnouncementServiceProvider.makeAnnouncement.call(this, embed)
}

module.exports = run