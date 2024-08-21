const sequelize = require('./db');
const Terrain = require('./models/Terrain');
const Proprietaire = require('./models/Proprietaire');
const Transaction = require('./models/Transaction');

async function syncDB() {
    try {
        // Sync all models to the database
        await sequelize.sync({ force: true }); // `force: true` drops tables if they exist
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    } finally {
        sequelize.close();
    }
}

syncDB();
