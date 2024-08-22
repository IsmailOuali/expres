const pool = require('../db');

// Create Terrain
exports.createTerrain = async (req, res) => {
    try {
        const { adresse, superficie, type, prix } = req.body;
        const [result] = await pool.query(
            'INSERT INTO terrains (adresse, superficie, type, prix) VALUES (?, ?, ?, ?)',
            [adresse, superficie, type, prix]
        );
        const terrainId = result.insertId;
        // Redirect to a page showing the new terrain or another relevant page
        res.redirect('/terrains');
    } catch (error) {
        console.error('Error creating terrain:', error);
        res.status(400).render('error', { error: error.message });
    }
};

// Get All Terrains
exports.getAllTerrains = async (req, res) => {
    try {
        const [terrains] = await pool.query('SELECT * FROM terrains');
        res.status(200).render('terrains/index', { terrains }); // Render the view and pass the data
    } catch (error) {
        console.error('Error fetching terrains:', error);
        res.status(500).render('error', { error: error.message });
    }
};

// Get Terrain by ID
exports.getTerrainById = async (req, res) => {
    try {
        const [terrains] = await pool.query('SELECT * FROM terrains WHERE id = ?', [req.params.id]);
        if (terrains.length > 0) {
            res.status(200).render('terrains/show', { terrain: terrains[0] });
        } else {
            res.status(404).render('error', { message: 'Terrain not found' });
        }
    } catch (error) {
        console.error('Error fetching terrain:', error);
        res.status(500).render('error', { error: error.message });
    }
};

// Update Terrain by ID
exports.updateTerrainById = async (req, res) => {
    try {
        const { adresse, superficie, type, prix } = req.body;
        const [result] = await pool.query(
            'UPDATE terrains SET adresse = ?, superficie = ?, type = ?, prix = ? WHERE id = ?',
            [adresse, superficie, type, prix, req.params.id]
        );
        if (result.affectedRows > 0) {
            const [updatedTerrain] = await pool.query('SELECT * FROM terrains WHERE id = ?', [req.params.id]);
            res.status(200).render('terrains/show', { terrain: updatedTerrain[0] });
        } else {
            res.status(404).render('error', { message: 'Terrain not found' });
        }
    } catch (error) {
        console.error('Error updating terrain:', error);
        res.status(400).render('error', { error: error.message });
    }
};

// Delete Terrain by ID
exports.deleteTerrainById = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM terrains WHERE id = ?', [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(204).redirect('/terrains');
        } else {
            res.status(404).render('error', { message: 'Terrain not found' });
        }
    } catch (error) {
        console.error('Error deleting terrain:', error);
        res.status(500).render('error', { error: error.message });
    }
};
