const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario');

    router.get('/', usuarioController.getUsuarios);
    router.post('/', usuarioController.createUsuario);
    router.get('/:id', usuarioController.getUsuario);
    router.put('/:id', usuarioController.editUsuario);
    router.delete('/:id', usuarioController.deleteUsuario);
module.exports = router;