const pg = require("pg");

const query = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

query.connect()
    .then(() => console.log('Banco de dados conectado com sucesso !'))
    .catch((err) => console.error('Erro ao conectar ao banco de dados', err));

module.exports = query;