const express = require("express");
const router = express.Router()
const {createUser} = require("../controllers/users")
const {validateCreateUser} = require("../middlewares/users")

router.post("/users", validateCreateUser, createUser)

module.exports = router;