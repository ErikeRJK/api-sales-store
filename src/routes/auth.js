const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const authMiddlewares = require("../middlewares/auth")
const { authToken } = require("../middlewares/authToken")

router.post(
    "/login",
    authMiddlewares.validateLogin,
    authController.login
)

router.get(
    "/profile",
    authToken(),
    authController.profile
)

module.exports = router;