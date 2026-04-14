const express = require("express");
const router = express.Router();
const axios = require("axios");

const productsController = require("../controllers/products");
const productMiddleware = require("../middlewares/products");
const { authToken } = require("../middlewares/authToken");

router.get("/productsAll", authToken(), productsController.getAllProducts);
router.post("/products", authToken(["seller"]),productMiddleware.validateCreateProducts,productsController.createProduct)

router.get("/email", async (req, res) => {
    await axios.get("http://localhost:4506/", {
        headers: {
            "secret-key": "jujuba123"
        }
    })

    res.send("Email enviado com sucesso!")
})

module.exports = router;
