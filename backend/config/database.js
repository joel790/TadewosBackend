
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'student',
    'root',
    'tadewos_trainning',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;
