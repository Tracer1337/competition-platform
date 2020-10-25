module.exports = {
    maxUploadSize: 1024 * 1024 * 5, // 5MB
    
    projects: {
        maxUploadImages: 5
    },

    competitions: {
        maxVotesPerCompetition: 2
    },

    discord: {
        api: {
            basename: "https://discord.com/api"
        }
    }
}