const sequelize = require("../config/sequelize");
const Categories = require("./categories");
const Products = require("./products");
const Users = require("./users")
const ProductsImages = require("./products_images");

sequelize.sync()
    .then(() => console.log('Models sinconizados com sucesso!'))
    .catch((err) => console.error('Erro ao sincronizar models:', err));

module.exports = {
    Categories,
    Products,
    Users,
    ProductsImages

};