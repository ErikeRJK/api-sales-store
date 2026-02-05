require("dotenv").config()
const express = require("express");
const database = require("./src/config/database")

const app = express();
const port = 4505;

app.use(express.json());

app.get("/products", async (req,res) =>{
    try {
        const result = await database.query(`SELECT * FROM products ORDER BY id ASC;`)
        res.status(200).send(result.rows)
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }

})

app.get("/products/:id", async (req,res) =>{

    const { id } = req.params

    if(!id){
        return res.status(400).send({error: "Nome, preço e categoria são obrigatórios."})
    }
    try {
        const result = await database.query(`SELECT * FROM products WHERE id = $1;`, [id])
        res.status(200).send(result.rows[0])
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }

})

app.get("/products/name/:name", async (req,res) =>{

    const { name } = req.params

    if(!name){
        return res.status(400).send({error: "Nome, preço e categoria são obrigatórios."})
    }
    try {
        const result = await database.query(`SELECT * FROM products WHERE name = $1;`, [name])
        res.status(201).send(result.rows)
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }
})

app.get("/products/listar/name/:name", async (req,res) =>{

    const { name } = req.params

    if(!name){
        return res.status(400).send({error: "Nome, preço e categoria são obrigatórios."})
    }

    try {
        const result = await database.query(`SELECT * FROM products WHERE name ILIKE $1`,[`%${name}%`])
        res.status(201).send(result.rows)
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }
    
})

app.post("/products", async (req, res) =>{

    const {name, price, category_id} = req.body

    if(!name || !price || !category_id){
        return res.status(400).send({error: "Nome, preço e categoria são obrigatórios."})
    }

    try {
        const result = await database.query(`INSERT INTO products (name, price, category_id)
            VALUES ($1, $2, $3) RETURNING *;`, [name, price, category_id])
        res.status(201).send(result.rows[0])
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }

})

app.delete("/products/:id", async (req, res) =>{

    const { id } = req.params

    if(!id){
        return res.status(400).send({error: "Id é um campo Obrigatório"})
    }

    try { 
        const result = await database.query(`DELETE FROM products WHERE id = $1 RETURNING *;`, [id])
        res.status(201).send(result.rows[0])
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }

})

app.put("/products/:id", async (req, res) =>{

    const { id } = req.params
    const {name, price, category_id} = req.body

    if(!id || !name || !price || !category_id){
        return res.status(400).send({error: "Id, nome, preço e categoria são campos obrigatórios."})
    }

    try {
        const result = await database.query(`UPDATE products SET name = $1, price = $2, category_id = $3
            WHERE id = $4 RETURNING *;`, [name, price, category_id, id])
        res.status(201).send(result.rows[0])
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }

})

app.patch("/products/price/:id", async (req, res) => {
    
    const {id} = req.params
    const {price} = req.body

    if(!id || !price){
        return res.status(400).send({error: "id e price são campos Obrigatorios."})
    }
    try {
        const result = await database.query(`UPDATE products SET price = $1 WHERE id = $2 RETURNING *;`, [price, id])
        res.status(201).send(result.rows[0])
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }

})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})