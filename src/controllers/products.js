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
        specifications,
        shipping,
        warranty,
        return: return_policy
        
     })
     res.status(201).send(newProduct)
   } catch (error) {
   console.error("ERRO COMPLETO:", error)
   res.status(500).json({
      message: "Erro ao criar produto",
      error: error.message
   })
}
}

module.exports = {
    createProduct
}