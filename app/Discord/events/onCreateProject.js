const Competition = require("../../Models/Competition.js")
const ProjectCreateEmbed = require("../Embed/ProjectCreateEmbed.js")
const AnnouncementServiceProvider = require("../Services/AnnouncementServiceProvider.js")

async function run(project) {
    const competition = await Competition.findBy("id", project.competition_id)

    const embed = new ProjectCreateEmbed({ project, competition })
    await AnnouncementServiceProvider.makeAnnouncement.call(this, embed)
}

module.exports = run