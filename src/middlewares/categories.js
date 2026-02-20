const Categories = require("../models/categories")

async function validateInsertCategory(req, res, next){
    const {name} = req.body

    if(!name){
        return res.status(400).send({error: "O campo name é obrigatório."})
    }

    if(!name.lengh > 255){
        return res.status(400).send({error: "O campo name deve conter no máximo 255 caracteres."})
    }

    try {
        const category = await Categories.findOne({where: {name}})

        if(category){
            return res.status(400).send({error: "Categoria já existe"})
        }
    } catch (error) {
        return res.status(500).send({error: "Erro ao validar existencia da categoria"})
    }

    next()
}

module.exports = {
    validateInsertCategory
}