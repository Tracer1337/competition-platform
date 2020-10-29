const BaseEmbed = require("./BaseEmbed.js")
const { makeURL } = require("../../utils")

class ProjectCreateEmbed extends BaseEmbed {
    constructor(project, competition, strings) {
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