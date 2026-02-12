 require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
    }
)

module.exports = sequelize;

sequelize.authenticate()
    .then(() => console.log('Banco de dados conectado com sucesso via sequelize!'))
    .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));