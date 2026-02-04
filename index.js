require("dotenv").config()
const express = require("express");
const database = require("./src/config/database")

const app = express();
const port = 4505;

app.use(express.json());

app.get("/products", async (req,res) =>{
    const result = await database.query(`SELECT * FROM products ORDER BY id ASC;`)
    res.send(result.rows)
})

app.post("/products", async (req, res) =>{
    const {name, price, category_id} = req.body
    const result = await database.query(`INSERT INTO products (name, price, category_id)
        VALUES ($1, $2, $3) returning *;`, [name, price, category_id])
    res.send(result.rows[0])
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})