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
    },

    level: {
        firstLevelPointsRequired: 1000,
        maxPointsRequired: 5000,
        pointsIncrement: 1000,
        
        competitionWinnerPoints: 3000,
        
        roleName: "Level {}",
        roleColor: "WHITE"
    }
}