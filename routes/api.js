const express = require("express")

const Validator = require("../lib/Validator.js")

const ProtectMiddleware = require("../app/Middleware/ProtectMiddleware.js")
const UploadMiddleware = require("../app/Middleware/UploadMiddleware.js")

const AuthController = require("../app/Controllers/AuthController.js")
const CompetitionController = require("../app/Controllers/CompetitionController.js")
const ProjectController = require("../app/Controllers/ProjectController.js")
const StorageController = require("../app/Controllers/StorageController.js")

const router = express.Router()

router.get("/auth/discord", AuthController.oauthDiscord)
router.get("/auth/profile", ProtectMiddleware, AuthController.getProfile)

router.get("/competitions", ProtectMiddleware, CompetitionController.getAll)
router.post("/competitions", ProtectMiddleware, CompetitionController.create)
router.post("/competitions/:id", ProtectMiddleware, CompetitionController.update)
router.delete("/competitions/:id", ProtectMiddleware, CompetitionController.remove)

router.get("/projects", ProtectMiddleware, ProjectController.getAll)
router.post("/projects", UploadMiddleware.single("file"), new Validator().uuid("competition_id"), ProtectMiddleware, ProjectController.create)
router.post("/projects/:id", UploadMiddleware.single("file"), ProtectMiddleware, ProjectController.update)
router.delete("/projects/:id", ProtectMiddleware, ProjectController.remove)

router.get("/storage/:filename", ProtectMiddleware, StorageController.getFile)

module.exports = router