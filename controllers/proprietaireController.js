const pool = require('../db');

// Create Proprietaire
exports.createProprietaire = async (req, res) => {
    try {
        const { nom, adresse, contact } = req.body;
        const [result] = await pool.query(
            'INSERT INTO proprietaires (nom, adresse, contact) VALUES (?, ?, ?)',
            [nom, adresse, contact]
        );
        const proprietaireId = result.insertId;
        res.status(201).json({ id: proprietaireId, nom, adresse, contact });
    } catch (error) {
        console.error('Error creating proprietaire:', error);
        res.status(400).json({ error: error.message });
    }
};

// Get All Proprietaires
exports.getAllProprietaires = async (req, res) => {
    try {
        const [proprietaires] = await pool.query('SELECT * FROM proprietaires');
        res.status(200).json(proprietaires);
    } catch (error) {
        console.error('Error fetching proprietaires:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getProprietaireById = async (req, res) => {
    try {
        const [proprietaires] = await pool.query('SELECT * FROM proprietaires WHERE id = ?', [req.params.id]);
        if (proprietaires.length > 0) {
            res.status(200).json(proprietaires[0]);
        } else {
            res.status(404).json({ message: 'Proprietaire not found' });
        }
    } catch (error) {
        console.error('Error fetching proprietaire:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateProprietaireById = async (req, res) => {
    try {
        const { nom, adresse, contact } = req.body;
        const [result] = await pool.query(
            'UPDATE proprietaires SET nom = ?, adresse = ?, contact = ? WHERE id = ?',
            [nom, adresse, contact, req.params.id]
        );
        if (result.affectedRows > 0) {
            const [updatedProprietaire] = await pool.query('SELECT * FROM proprietaires WHERE id = ?', [req.params.id]);
            res.status(200).json(updatedProprietaire[0]);
        } else {
            res.status(404).json({ message: 'Proprietaire not found' });
        }
    } catch (error) {
        console.error('Error updating proprietaire:', error);
        res.status(400).json({ error: error.message });
    }
};

// Delete Proprietaire by ID
exports.deleteProprietaireById = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM proprietaires WHERE id = ?', [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Proprietaire not found' });
        }
    } catch (error) {
        console.error('Error deleting proprietaire:', error);
        res.status(500).json({ error: error.message });
    }
};
