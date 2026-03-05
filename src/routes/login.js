const express = require("express");
const router = express.Router()
const { login } = require("../controllers/auth")
const { validateLogin } = require("../middlewares/auth")

router.post("/login", validateLogin, login)

module.exports = router;