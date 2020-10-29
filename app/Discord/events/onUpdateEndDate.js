const UpdateEndDateEmbed = require("../Embed/UpdateEndDateEmbed.js")
const AnnouncementServiceProvider = require("../Services/AnnouncementServiceProvider.js")

async function run() {
    await AnnouncementServiceProvider.sendEmbed.call(this, UpdateEndDateEmbed, arguments)
}

module.exports = run