const SetEndDateEmbed = require("../Embed/SetEndDateEmbed.js")
const AnnouncementServiceProvider = require("../Services/AnnouncementServiceProvider.js")

async function run() {
    await AnnouncementServiceProvider.sendEmbed.call(this, SetEndDateEmbed, arguments)
}

module.exports = run