const express = require("express");
const router = express.Router()

const productsController = require("../controllers/products")
const productMiddleware = require("../middlewares/products")

router.get("/products", productsController.getAllProducts)
router.post("/products", productMiddleware.validateCreateProduct, productsController.createProduct)
router.delete("/products/:id", productMiddleware.validateDeleteProduct, productsController.deleteProduct)
router.put("/products/:id", productMiddleware.validateUpdateProduct, productsController.updateProduct)
router.get("/products/:id", productMiddleware.validateGetSearchById, productsController.getSearchById)

module.exports = router;