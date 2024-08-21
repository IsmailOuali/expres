const express = require('express');
const terrainController = require('../controllers/terrainController');

const router = express.Router();

router.post('/', terrainController.createTerrain);
router.get('/', terrainController.getAllTerrains);
router.get('/:id', terrainController.getTerrainById);
router.put('/:id', terrainController.updateTerrainById);
router.delete('/:id', terrainController.deleteTerrainById);

module.exports = router;
