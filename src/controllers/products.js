const { Categories } = require("../models");
const productsModel = require("../models/products");// Importa o modelo de produtos para interagir com o banco de dados
const ProductImages = require("../models/products_images");
const { uploadAndSaveProductsImages } = require("../services/product-images-upload");

async function getAllProducts(req, res){// Controlador para obter todos os produtos
     try {
    const products = await productsModel.findAll({
      include: [
        {
          model: ProductImages,
          attributes: ["url"],
          required: true
        },
        {
          model: Categories,
          attributes: ["name"],
          required: true
        }
      ]
    });
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

     let images = []
     try {
      images = await uploadAndSaveProductsImages(newProduct.id, req.files)
     } catch (error) {
        console.error("Erro ao fazer upload das imagens", error.message)
     }

     res.status(201).send({
      product: newProduct,
      imaages: images.map(img => img.url)
     })
   } catch (error) {
      console.log(error)
     res.status(500).send({ error: "Erro ao criar produto." })
   }
}

async function getProductById(req, res){
  const { id } = req.params;

  try {
    const product = await productsModel.findByPk(id, {
      include: [
        {
          model: ProductImages,
          attributes: ["url"],
          required: true
        },
        {
          model: Categories,
          attributes: ["name"],
          required: true
        }
      ]
    })

    if(!product){
      return res.status(400).send({
        error: "Produto não encontrado"
      })
    }

    return res.send(product)
  } catch (error) {
    return res.status(500).send({
      error: error.message
    })
  }
  
}


module.exports = {// Exporta os controladores para serem usados nas rotas
    getAllProducts,
    createProduct,
    getProductById
}