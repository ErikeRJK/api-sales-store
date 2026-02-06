require("dotenv").config()
const express = require("express");
const database = require("./src/config/database")
const routesProducts = require("./src/routes/products")

const app = express();
const port = 4505;

app.use(express.json());
app.use("/", routesProducts)



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