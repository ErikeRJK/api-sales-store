const express = require("express");
const router = express.Router()

const productsController = require("../controllers/legacy/products")
const productMiddleware = require("../middlewares/legacy/products")

router.get("/products", productsController.getAllProducts)
router.post("/products", productMiddleware.validateCreateProduct, productsController.createProduct)
router.delete("/products/:id", productMiddleware.validateProductNoId, productMiddleware.validateProductNoId , productMiddleware.validateDeleteProduct, productsController.deleteProduct)
router.put("/products/:id", productMiddleware.validateProductNoId, productMiddleware.validateUpdateProduct, productsController.updateProduct)
router.get("/products/:id", productMiddleware.validateProductNoId, productMiddleware.validateGetSearchById, productsController.getSearchById)
router.get("/products/name/:name", productMiddleware.validateGetSearchProductForName, productsController.getSearchProductForName)
router.get("/products/listar/name/:name", productMiddleware.validateGetSearchListProductForName, productsController.getSearchListProductForName)
router.patch("/products/price/:id", productMiddleware.validateProductNoId, productMiddleware.validatePathPriceForId, productsController.pathPriceId)

module.exports = router;