const carrera = require('../models/Carrera');
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');


const carreraController = {};

carreraController.getCarreras = async(req, res) => {
    const carreras = await carrera.find();
    res.json(carreras);
}

carreraController.getCarrera = async(req, res) => {
    const getCarr = await carrera.findById(req.params.id);
    res.json(getCarr);
}

carreraController.createCarrera = async(req, res) => {
    const newCarrera = new carrera(req.body);
    await newCarrera.save();
    res.json({
        status: "Carrera saved"
    });
}

carreraController.editCarrera = async(req, res) => {
    const { id } = req.params;
    const oneCarrera = {
        nombre: req.params.nombre,
        especialidad: req.params.especialidad,
        abreviatura: req.params.abreviatura

    };
    await carrera.findByIdAndUpdate(id, { $set: oneCarrera }, { new: true });
    res.json({
        status: "Carrera Updated"
    })
}


carreraController.deleteCarrera = async(req, res) => {
    await carrera.findByIdAndRemove(req.params.id);
    res.json({
        status: "Carrera Deleted"
    })
}

module.exports = carreraController;