function validateCreateProduct(req,res,next){
    const {name, price, category_id} = req.body

    if(!name || !price || !category_id){
        return res.status(400).send({error: "Nome, preço e categoria são obrigatórios."})
    }

    next()
}

function validateDeleteProduct(req, res, next){
    const { id } = req.params

    if(!id){
        return res.status(400).send({error: "Id é um campo Obrigatório"})
    }
    next()
}

function validateUpdateProduct(req, res, next){
    const { id } = req.params
    const {name, price, category_id} = req.body

    if(!id || !name || !price || !category_id){
        return res.status(400).send({error: "Id, nome, preço e categoria são campos obrigatórios."})
    }
    next()
}

module.exports = {
    validateCreateProduct,
    validateDeleteProduct,
    validateUpdateProduct
}