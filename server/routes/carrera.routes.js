const express = require('express');
const router = express.Router();
const carreraController = require('../controllers/Carrera.controller');

router.get('/', carreraController.getCarreras);
router.post('/', carreraController.createCarrera);
router.get('/:id', carreraController.getCarrera);
router.put('/:id', carreraController.editCarrera);
router.delete('/:id', carreraController.deleteCarrera);

module.exports = router;