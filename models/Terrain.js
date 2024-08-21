const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Terrain = sequelize.define('Terrain', {
    adresse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    superficie: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Terrain;
