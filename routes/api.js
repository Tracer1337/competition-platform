const express = require("express")

const ProtectMiddleware = require("../app/Middleware/ProtectMiddleware.js")
const UploadMiddleware = require("../app/Middleware/UploadMiddleware.js")

const AuthController = require("../app/Controllers/AuthController.js")

const router = express.Router()

router.get("/auth/discord", AuthController.oauthDiscord)
router.get("/auth/profile", ProtectMiddleware, AuthController.getProfile)

module.exports = router