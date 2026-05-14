const sequelize = require("../config/sequelize");
const Categories = require("./categories");
const Products = require("./products");
const Users = require("./users")
const ProductsImages = require("./products_images");

Products.hasMany(ProductsImages, {foreignKey: "product_id"}) // 1 para n
ProductsImages.belongsTo(Products, {foreignKey: "product_id"}) // 1 para 1

Products.belongsTo(Categories, {foreignKey: "category_id"})
Categories.hasMany(Products, {foreignKey: "category_id"})

sequelize.sync({alter: true})
    .then(() => console.log('Models sinconizados com sucesso!'))
    .catch((err) => console.error('Erro ao sincronizar models:', err));

module.exports = {
    Categories,
    Products,
    Users,
    ProductsImages
};