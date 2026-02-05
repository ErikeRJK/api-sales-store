const categoriesModel = require("../config/database");

const sql = `
    CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
    );
`;

categoriesModel.query(sql)
    .then(() => console.log("Tabela 'categories' criada com sucesso!"))
    .catch((err) => console.error("Erro ao criar tabela 'categories':", err));

module.exports = categoriesModel;