const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Banco de dados conectado com sucesso!');
    } catch (error) {
        console.error('Falha ao conectar com o banco:', error);
    }
})();

module.exports = sequelize;