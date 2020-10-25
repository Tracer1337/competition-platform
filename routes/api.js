const express = require("express")

const Validator = require("../lib/Validator.js")

const ProtectMiddleware = require("../app/Middleware/ProtectMiddleware.js")
const UploadMiddleware = require("../app/Middleware/UploadMiddleware.js")

const AuthController = require("../app/Controllers/AuthController.js")
const CompetitionController = require("../app/Controllers/CompetitionController.js")

const router = express.Router()

router.get("/auth/discord", AuthController.oauthDiscord)
router.get("/auth/profile", ProtectMiddleware, AuthController.getProfile)

router.post("/competitions", ProtectMiddleware, CompetitionController.create)
router.post("/competitions/:id", ProtectMiddleware, CompetitionController.update)
router.delete("/competitions/:id", ProtectMiddleware, CompetitionController.remove)

module.exports = router