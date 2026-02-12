const productsModel = require ("../config/database");

const sql = `
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category_id INT,
        FOREIGN KEY (category_id) REFERENCES categories(id)
    );
`;

productsModel.query(sql)
    .then(() => console.log("Tabela 'products' criada com sucesso!"))
    .catch((err) => console.error("Erro ao criar tabela 'products':", err));

module.exports = productsModel;