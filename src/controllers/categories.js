const Categories = require("../models/categories")
async function insertCategory(req, res) {
    const {name } = req.body

    try {
        await Categories.create({name})
        res.status(201).send({message: "Categoria criada com sucesso"})
    } catch (error) {
        res.status(500).send({message: "Erro ao criar categoria"})
    }
}

module.exports = {
    insertCategory
}