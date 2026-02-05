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

app.get("/products/:id", async (req,res) =>{
    const { id } = req.params
    const result = await database.query(`SELECT * FROM products WHERE id = $1;`, [id])
    res.send(result.rows[0])
})

app.get("/products/name/:name", async (req,res) =>{
    const { name } = req.params
    const result = await database.query(`SELECT * FROM products WHERE name = $1;`, [name])
    res.send(result.rows)
})

app.get("/products/listar/name/:name", async (req,res) =>{
    const { name } = req.params
    const result = await database.query(`SELECT * FROM products WHERE name ILIKE $1`,[`%${name}%`])
    res.send(result.rows)
})

app.post("/products", async (req, res) =>{
    const {name, price, category_id} = req.body
    const result = await database.query(`INSERT INTO products (name, price, category_id)
        VALUES ($1, $2, $3) RETURNING *;`, [name, price, category_id])
    res.send(result.rows[0])
})

app.delete("/products/:id", async (req, res) =>{
    const { id } = req.params
    const result = await database.query(`DELETE FROM products WHERE id = $1 RETURNING *;`, [id])
    res.send(result.rows[0])
})

app.put("/products/:id", async (req, res) =>{
    const { id } = req.params
    const {name, price, category_id} = req.body
    const result = await database.query(`UPDATE products SET name = $1, price = $2, category_id = $3
        WHERE id = $4 RETURNING *;`, [name, price, category_id, id])
    res.send(result.rows[0])
})

app.patch("/products/price/:id", async (req, res) => {
    const {id} = req.params
    const {price} = req.body
    const result = await database.query(`UPDATE products SET price = $1 WHERE id = $2 RETURNING *;`, [price, id])
    res.send(result.rows[0])
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})