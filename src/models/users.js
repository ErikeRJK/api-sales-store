const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const Users = sequelize.define("Users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("user", "admin", "seller"),
        allowNull: false,
        defaultValue: "user"
    }
});

module.exports = Users
