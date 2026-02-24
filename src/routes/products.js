const express = require("express");
const router = express.Router()

const productsController = require("../controllers/products")
const productMiddleware = require("../middlewares/products")

router.post("/products", productMiddleware.validateCreateProducts, productsController.createProduct)

module.exports = router;