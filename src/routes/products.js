const express = require("express");
const router = express.Router();
const axios = require("axios");

const productsController = require("../controllers/products");
const productMiddleware = require("../middlewares/products");
const { authToken } = require("../middlewares/authToken");

router.get("/products", productsController.getAllProducts);
router.post("/products", authToken(["seller"]),productMiddleware.validateCreateProducts,productsController.createProduct)
router.get("/products/:id", productsController.getProductById)

module.exports = router;
