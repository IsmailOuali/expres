const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Terrain = require('./Terrain');
const Proprietaire = require('./Proprietaire');

const Transaction = sequelize.define('Transaction', {
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    montant: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    }
});

// Define relationships
Transaction.belongsTo(Terrain, { foreignKey: 'terrain_id', as: 'terrain', onDelete: 'CASCADE' });
Transaction.belongsTo(Proprietaire, { foreignKey: 'proprietaire_id', as: 'proprietaire', onDelete: 'CASCADE' });

module.exports = Transaction;
