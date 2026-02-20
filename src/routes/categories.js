const express = require("express");
const router = express.Router()

const productsController = require("../controllers/categories")
const productMiddleware = require("../middlewares/categories")

router.post("/categories", productMiddleware.validateInsertCategory, productsController.insertCategory)

module.exports = router;