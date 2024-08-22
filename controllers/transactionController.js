const pool = require('../db');

// Create Transaction
exports.createTransaction = async (req, res) => {
    try {
        const { date, montant, terrain_id, proprietaire_id } = req.body;
        const [result] = await pool.query(
            'INSERT INTO transactions (date, montant, terrain_id, proprietaire_id) VALUES (?, ?, ?, ?)',
            [date, montant, terrain_id, proprietaire_id]
        );
        const transactionId = result.insertId;
        res.status(201).json({ id: transactionId, date, montant, terrain_id, proprietaire_id });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(400).json({ error: error.message });
    }
};

// Get All Transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const [transactions] = await pool.query(`
            SELECT t.*, te.adresse AS terrain_adresse, p.nom AS proprietaire_nom
            FROM transactions t
            JOIN terrains te ON t.terrain_id = te.id
            JOIN proprietaires p ON t.proprietaire_id = p.id
        `);
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get Transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const [transactions] = await pool.query(`
            SELECT t.*, te.adresse AS terrain_adresse, p.nom AS proprietaire_nom
            FROM transactions t
            JOIN terrains te ON t.terrain_id = te.id
            JOIN proprietaires p ON t.proprietaire_id = p.id
            WHERE t.id = ?
        `, [req.params.id]);

        if (transactions.length > 0) {
            res.status(200).json(transactions[0]);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update Transaction by ID
exports.updateTransactionById = async (req, res) => {
    try {
        const { date, montant, terrain_id, proprietaire_id } = req.body;
        const [result] = await pool.query(`
            UPDATE transactions 
            SET date = ?, montant = ?, terrain_id = ?, proprietaire_id = ?
            WHERE id = ?
        `, [date, montant, terrain_id, proprietaire_id, req.params.id]);

        if (result.affectedRows > 0) {
            const [updatedTransaction] = await pool.query(`
                SELECT t.*, te.adresse AS terrain_adresse, p.nom AS proprietaire_nom
                FROM transactions t
                JOIN terrains te ON t.terrain_id = te.id
                JOIN proprietaires p ON t.proprietaire_id = p.id
                WHERE t.id = ?
            `, [req.params.id]);

            res.status(200).json(updatedTransaction[0]);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(400).json({ error: error.message });
    }
};

// Delete Transaction by ID
exports.deleteTransactionById = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM transactions WHERE id = ?', [req.params.id]);

        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: error.message });
    }
};
