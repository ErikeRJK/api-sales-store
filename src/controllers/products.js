const productsModel = require("../models/products");// Importa o modelo de produtos para interagir com o banco de dados

async function getAllProducts(req, res){// Controlador para obter todos os produtos
     try {
    const products = await productsModel.findAll();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar produtos." });
  }
}

async function createProduct(req, res) {// Controlador para criar um novo produto
    const { name, price, original_price, category_id, is_new, description, specfications, shipping, warranty, return_policy } = req.body

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
     res.status(500).send({ error: "Erro ao criar produto." })
   }
}


module.exports = {// Exporta os controladores para serem usados nas rotas
    getAllProducts,
    createProduct
    
}