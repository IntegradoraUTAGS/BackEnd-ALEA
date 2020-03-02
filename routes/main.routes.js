const express = require('express');
const router = express.Router();
// const userController = require('../controllers/Users.controller');
const alertController = require('../controllers/Alert.controller');

// router.get('/', userController.getUsers);
// router.post('/', userController.createUser);
// router.get('/:id', userController.getUser);
// router.put('/:id', userController.editUser);
// router.delete('/:id', userController.deleteUser);


router.get('/', alertController.getAlerts);
router.post('/', alertController.createAlert);
router.get('/:id', alertController.getAlert);
router.put('/:id', alertController.editAlert);
router.delete('/:id', alertController.deleteAlert);

module.exports = router;