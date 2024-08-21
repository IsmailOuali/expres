const express = require('express');
const proprietaireController = require('../controllers/proprietaireController');

const router = express.Router();

router.post('/', proprietaireController.createProprietaire);
router.get('/', proprietaireController.getAllProprietaires);
router.get('/:id', proprietaireController.getProprietaireById);
router.put('/:id', proprietaireController.updateProprietaireById);
router.delete('/:id', proprietaireController.deleteProprietaireById);

module.exports = router;
