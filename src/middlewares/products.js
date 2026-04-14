const { Categories } = require("../models");
const multer = require("multer")

const upload = multer({storage: multer.memoryStorage()})

async function validateCreateProducts(req, res, next) {

  await new Promise((resolve, reject) => {
    upload.any("images", 5)(req, res, (err) => {
      if(err){
        reject(err)
      } else {
        resolve()
      }
    })
  })
  
  const { name, price, original_price, category_id, is_new, description, specfications, shipping, warranty, return_policy } = req.body

    if( !name || !price || !category_id || !is_new || !shipping || !warranty || !return_policy){
        return res.status(400).send({ error: "Os campos name, price, category_id, is_new, shipping, warranty, return_policy são obrigatórios."})
    }

  if (name.length > 255) {
    return res
      .status(400)
      .send({ error: "O campo name deve conter no máximo 255 caracteres." });
  }

  try {
    const category = await Categories.findByPk(category_id);

    if (!category) {
      return res.status(400).send({ error: "Categoria não encontrada." });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erro ao validar categoria." });
  }

  next();
}

module.exports = {
  validateCreateProducts,
};
