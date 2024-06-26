
const { Sequelize } = require('sequelize');
const dotenv = require("dotenv").config()
// const sequelize =new Sequelize(user, password, database_name,{dialect, host})
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
);

module.exports = sequelize;
