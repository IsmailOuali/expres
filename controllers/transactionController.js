const Transaction = require('../models/Transaction');
const Terrain = require('../models/Terrain');
const Proprietaire = require('../models/Proprietaire');

exports.createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            include: ['terrain', 'proprietaire']
        });
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id, {
            include: ['terrain', 'proprietaire']
        });
        if (transaction) {
            res.status(200).json(transaction);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateTransactionById = async (req, res) => {
    try {
        const [updated] = await Transaction.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTransaction = await Transaction.findByPk(req.params.id, {
                include: ['terrain', 'proprietaire']
            });
            res.status(200).json(updatedTransaction);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTransactionById = async (req, res) => {
    try {
        const deleted = await Transaction.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: error.message });
    }
};
