const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const terrainRoutes = require('./routes/terrainRoutes');
const proprietaireRoutes = require('./routes/proprietaireRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const PORT = process.env.PORT || 3000;
app.use(express.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Routes
app.use('/terrains', terrainRoutes);
app.use('/proprietaires', proprietaireRoutes);
app.use('/transactions', transactionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
