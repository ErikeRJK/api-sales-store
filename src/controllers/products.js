const productsModel = require("../models/products")

async function createProduct(req, res){
    const {name, price, original_price, category_id, is_new, description, specifications, shipping, warranty, return_policy} = req.body

    try {
     const newProduct = await productsModel.create({
        name,
        price,
        original_price,
        category_id,
        is_new,
        description,
        specfications,
        shipping,
        warranty,
        return: return_policy
     })

     res.status(201).send(newProduct)
   } catch (error) {
    
   }
}

module.exports = {
    createProduct
}