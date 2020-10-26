const express = require("express")

const Validator = require("../lib/Validator.js")

const ProtectMiddleware = require("../app/Middleware/ProtectMiddleware.js")
const UploadMiddleware = require("../app/Middleware/UploadMiddleware.js")

const AuthController = require("../app/Controllers/AuthController.js")
const CompetitionController = require("../app/Controllers/CompetitionController.js")
const ProjectController = require("../app/Controllers/ProjectController.js")
const StorageController = require("../app/Controllers/StorageController.js")

const config = require("../config")

const router = express.Router()

const projectsUploadMiddleware = UploadMiddleware.fields([
    { name: "file", maxCount: 1 },
    { name: "images", maxCount: config.projects.maxUploadImages }
])

router.get("/auth/discord", AuthController.oauthDiscord)
router.get("/auth/profile", ProtectMiddleware, AuthController.getProfile)

router.get("/competitions", CompetitionController.getAll)
router.get("/competitions/:id", ProtectMiddleware.NotRequired, CompetitionController.getOne)
router.get("/competitions/:id/submissions", ProtectMiddleware.NotRequired, CompetitionController.getSubmissions)
router.post("/competitions", ProtectMiddleware, new Validator().text("title"), CompetitionController.create)
router.post("/competitions/:id", ProtectMiddleware, CompetitionController.update)
router.delete("/competitions/:id", ProtectMiddleware, CompetitionController.remove)

router.get("/projects", ProtectMiddleware, ProjectController.getAll)
router.get("/projects/:id", ProtectMiddleware.NotRequired, ProjectController.getOne)
router.post("/projects", ProtectMiddleware, projectsUploadMiddleware, ProjectController.create)
router.post("/projects/:id", ProtectMiddleware, projectsUploadMiddleware, ProjectController.update)
router.delete("/projects/:id", ProtectMiddleware, ProjectController.remove)
router.post("/projects/vote/:id", ProtectMiddleware, ProjectController.vote)
router.delete("/projects/vote/:id", ProtectMiddleware, ProjectController.deleteVote)

router.get("/storage/:filename", StorageController.getFile)

module.exports = router