const BaseEmbed = require("./BaseEmbed.js")
const Competition = require("../../Models/Competition.js")
const { makeURL } = require("../../utils")

class ProjectCreateEmbed extends BaseEmbed {
    static event = "createProject"

    static async makeEmbed(project, ...args) {
        const competition = await Competition.findBy("id", project.competition_id)
        return new ProjectCreateEmbed({ project, competition }, ...args)
    }

    constructor({ project, competition }, strings) {
        super()

        this.setTitle(`${strings["projects.create.title"]}: ${competition.title}`)
            .setUser(project.user)
            .setDescription(`<@${project.user.id}> ${strings["projects.create.desc"]}`)
            .setURL(makeURL("/project/" + project.id))

        if (project.images[0]) {
            let url
            
            if (process.env.NODE_ENV === "development") {
                url = "https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg"
            } else {
                url = makeURL("/api/storage/" + project.images[0].filename)
            }

            this.setThumbnail(url)
        }
    }
}

module.exports = ProjectCreateEmbed