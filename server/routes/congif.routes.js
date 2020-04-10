const express = require('express');
const router = express.Router();
const alertConfig = require('../controllers/Alerts.controller');


    // alerts routing
    router.get('/obtener/:dteFechaInicio/:dteFechaFin', alertConfig.get);
module.exports = router;