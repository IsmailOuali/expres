const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Proprietaire = sequelize.define('Proprietaire', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Proprietaire;
