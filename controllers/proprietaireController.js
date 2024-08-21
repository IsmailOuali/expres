const Proprietaire = require('../models/Proprietaire');

exports.createProprietaire = async (req, res) => {
    try {
        const proprietaire = await Proprietaire.create(req.body);
        res.status(201).json(proprietaire);
    } catch (error) {
        console.error('Error creating proprietaire:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.getAllProprietaires = async (req, res) => {
    try {
        const proprietaires = await Proprietaire.findAll();
        res.status(200).json(proprietaires);
    } catch (error) {
        console.error('Error fetching proprietaires:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getProprietaireById = async (req, res) => {
    try {
        const proprietaire = await Proprietaire.findByPk(req.params.id);
        if (proprietaire) {
            res.status(200).json(proprietaire);
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
        const [updated] = await Proprietaire.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedProprietaire = await Proprietaire.findByPk(req.params.id);
            res.status(200).json(updatedProprietaire);
        } else {
            res.status(404).json({ message: 'Proprietaire not found' });
        }
    } catch (error) {
        console.error('Error updating proprietaire:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.deleteProprietaireById = async (req, res) => {
    try {
        const deleted = await Proprietaire.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Proprietaire not found' });
        }
    } catch (error) {
        console.error('Error deleting proprietaire:', error);
        res.status(500).json({ error: error.message });
    }
};
