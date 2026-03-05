require("dotenv").config()
const express = require("express");
const routesProducts = require("./src/routes/products")
const routesCategories = require("./src/routes/categories")
const routesUsers = require("./src/routes/users")
const routesLogin = require("./src/routes/login")
require("./src/models")

const app = express();
const port = 4505;

app.use(express.json());
app.use("/", routesProducts)
app.use("/", routesCategories)
app.use(routesUsers)
app.use(routesLogin)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})