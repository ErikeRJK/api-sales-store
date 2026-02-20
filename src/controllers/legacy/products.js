const { where, Op } = require("sequelize")
const productsModel = require("../../models/products")

async function getAllProducts(req, res) {
    try {
        const result = await productsModel.findAll({
            order: [['id', 'DESC']]
        })
        
        if(!result) {
            return res.status(404).send({ message: "Nenhum produto encontrado." })
        }

        res.status(200).send(result)
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }
}

async function createProduct(req, res) {
    const {name, price, category_id} = req.body
    try {
        const result = await productsModel.create({
            name, price, category_id
        })
        res.status(201).send(result)
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }
}

async function deleteProduct(req,res){
    const { id } = req.params

    try { 
        await productsModel.destroy({
            where: {id}
        })
        res.status(200).send({message: `produto com Id ${id} deletado com sucesso !`})
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }
}

async function updateProduct(req,res){
    const { id } = req.params
    const {name, price, category_id} = req.body
    try {
        await productsModel.update({name, price, category_id}, { where: {id}})
        res.status(200).send({message: `produto com Id ${id} atualizado com sucesso !`})
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }
}

async function getSearchById(req, res){
    const { id } = req.params

    try {
        const result = await productsModel.findByPk(id)

        if(!result) {
            return res.status(404).send({message: `produto com id ${id} não encontrado`})
        }

        res.status(200).send(result)
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }
}

async function getSearchProductForName(req, res){
    const { name } = req.params

    try {
        const result = await productsModel.query(`SELECT * FROM products WHERE name = $1;`, [name])
        res.status(201).send(result.rows)
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }
}

async function getSearchListProductForName(req, res){
    const { name } = req.params

    try {
        // const result = await productsModel.query(`SELECT * FROM products WHERE name ILIKE $1`,[`%${name}%`])
        const result = await productsModel.findAll({
            where:{
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })
        res.status(200).send(result)
    } catch (error) {
        console.error("Erro ao buscar produtos por ID", error)
        res.status(500).send({error: "Erro ao buscar produtos por ID"})
    }
}

async function pathPriceId(req, res){
    const {id} = req.params
    const {price} = req.body

    try {
        await productsModel.update({price }, {where: {id}})
        res.status(201).send({message: `O preço do produto com Id: ${ id} foi atualizado com sucesso, novo valor: ${price} !`})
    } catch (error) {
        console.error("Erro ao buscar produtos", error)
        res.status(500).send({error: "Erro ao buscar produtos"})
    }
}

module.exports ={
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getSearchById,
    getSearchProductForName,
    getSearchListProductForName,
    pathPriceId
}