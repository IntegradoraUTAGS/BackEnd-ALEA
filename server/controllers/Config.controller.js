const express = require('express');
const logFunction = require('../models/Config'); 
const app = express();
const logFunction = (req, res, next) =>{
    let log = new Log({
        idUsuario: req.usuario._id, 
        strNombreFuncion: req.usuario.strNombreFuncion, 
        strRequest: JSON.stringify(req.body)
    });
    //Guardando los datos en la BD
    log.save()
    .catch((err)=>{
        return res.status(500).json({
            ok: false, 
            resp: 500, 
            msg: {
                err: err.message
            }

        });
    });
    next();  
};
app.get('/obtener/:dteFechaInicio/:dteFechaFin', process.middlewares, (req, res) =>{
    dteFechaInicio = req.params.dteFechaInicio;
    dteFechaFin = req.params.dteFechaFin;

    if(!dteFechaInicio || !dteFechaFin){
        return res.status(400).json({
            ok: false,
            resp: 400, 
            cont: {
                dteFechaInicio,
                dteFechaFin
            }
        });
    }
});
