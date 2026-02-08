require("dotenv").config()
const express = require("express");
const database = require("./src/config/database")
const routesProducts = require("./src/routes/products")

const app = express();
const port = 4505;

app.use(express.json());
app.use("/", routesProducts)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})