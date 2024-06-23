// backend/models/user.js
const { DataTypes } = require("sequelize");
const sequelize=require("../config/database")
   
const Student = sequelize.define("Student", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
  
module.exports= Student
