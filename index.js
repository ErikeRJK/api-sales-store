require("dotenv").config()
const express = require("express");
const database = require("./src/config/database")

const app = express();
const port = 4505;

const db = []

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Olá Mundo!")
})

app.post("/products", (req, res) => {
    const name = req.body.name;
    const {price, category} = req.body;

    if(!name || !price || !category){
        return res.status(400).send("Por favor, preencha todos os campos")
    }

    db.push({
        name,
        category,
        price
    })

    res.status(201).send("produto criado com sucesso !")
})

app.get("/products", (req, res) =>{
    res.send(db)
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})