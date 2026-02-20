require("dotenv").config()
const express = require("express");
const routesProducts = require("./src/routes/products")
const routesCategories = require("./src/routes/categories")
require("./src/models")

const app = express();
const port = 4505;

app.use(express.json());
app.use("/", routesProducts)
app.use("/", routesCategories)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})