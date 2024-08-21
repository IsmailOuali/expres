const express = require('express');
const bodyParser = require('body-parser');
const terrainRoutes = require('./routes/terrainRoutes');
const proprietaireRoutes = require('./routes/proprietaireRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/terrains', terrainRoutes);
app.use('/proprietaires', proprietaireRoutes);
app.use('/transactions', transactionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
