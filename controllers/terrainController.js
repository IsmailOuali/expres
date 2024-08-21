const Terrain = require('../models/Terrain');

exports.createTerrain = async (req, res) => {
    try {
        const terrain = await Terrain.create(req.body);
        res.status(201).json(terrain);
    } catch (error) {
        console.error('Error creating terrain:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.getAllTerrains = async (req, res) => {
    try {
        const terrains = await Terrain.findAll();
        res.status(200).json(terrains);
    } catch (error) {
        console.error('Error fetching terrains:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getTerrainById = async (req, res) => {
    try {
        const terrain = await Terrain.findByPk(req.params.id);
        if (terrain) {
            res.status(200).json(terrain);
        } else {
            res.status(404).json({ message: 'Terrain not found' });
        }
    } catch (error) {
        console.error('Error fetching terrain:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateTerrainById = async (req, res) => {
    try {
        const [updated] = await Terrain.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTerrain = await Terrain.findByPk(req.params.id);
            res.status(200).json(updatedTerrain);
        } else {
            res.status(404).json({ message: 'Terrain not found' });
        }
    } catch (error) {
        console.error('Error updating terrain:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTerrainById = async (req, res) => {
    try {
        const deleted = await Terrain.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Terrain not found' });
        }
    } catch (error) {
        console.error('Error deleting terrain:', error);
        res.status(500).json({ error: error.message });
    }
};
