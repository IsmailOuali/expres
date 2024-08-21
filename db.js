const { Sequelize } = require('sequelize');

// Initialize Sequelize to use MySQL
const sequelize = new Sequelize('express', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
