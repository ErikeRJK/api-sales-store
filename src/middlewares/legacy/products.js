const productsModel = require("../../models/products")

function validateCreateProduct(req,res,next){
    const {name, price, category_id} = req.body

    if(!name || !price || !category_id){
        return res.status(400).send({error: "Nome, preço e categoria são obrigatórios."})
    }

    next()
}

async function validateDeleteProduct(req, res, next){

    const { id } = req.params

    const product = await productsModel.findByPk(id)

    if(!product){
        return res.status(404).send({message: `Produto com ${id} não encontrado`})
    }

    next()
}

function validateProductNoId(req, res, next){
    const { id } = req.params

    if(!id){
        return res.status(400).send({error: "Id é um campo Obrigatório"})
    }
    next()
}

async function validateUpdateProduct(req, res, next){
    const { id } = req.params
    const {name, price, category_id} = req.body

    const produto = await validateExisteIdProduct(id)

    if(!produto){
        return res.status(404).send({message: `Produto com ${id} não encontrado`})
    }

    if(!id || !name || !price || !category_id){
        return res.status(400).send({error: "Id, nome, preço e categoria são campos obrigatórios."})
    }
    next()
}

async function validateGetSearchById(req, res, next){
    
    const { id } = req.params

    const produto = await validateExisteIdProduct(id)

    if(!produto){
        return res.status(404).send({message: `Produto com ${id} não encontrado`})
    }

    next()
}

function validateGetSearchProductForName(req, res, next){
    const { name } = req.params

    if(!name){
        return res.status(400).send({error: "Nome, preço e categoria são obrigatórios."})
    }

    next()
}

function validateGetSearchListProductForName(req, res, next){
    const { name } = req.params

    if(!name){
        return res.status(400).send({error: "Nome, preço e categoria são obrigatórios."})
    }
    next()
}

async function validatePathPriceForId(req, res, next){
    const {id} = req.params
    const {price} = req.body

    if(!price){
        return res.status(400).send({error: "preço é um campo Obrigatorios."})
    }

    const produto = await validateExisteIdProduct(id)

    if(!produto){
        return res.status(404).send({message: `Produto com ${id} não encontrado`})
    }

    next()
}

async function validateExisteIdProduct(id){
    const product = await productsModel.findByPk(id)

    return product
}

module.exports = {
    validateCreateProduct,
    validateDeleteProduct,
    validateUpdateProduct,
    validateGetSearchById,
    validateGetSearchProductForName,
    validateGetSearchListProductForName,
    validatePathPriceForId,
    validateProductNoId,
    
}