const alert = require('../models/Alert');

const alertController = {};

// /GET all alert

alertController.getAlerts = async(req, res) => {
        const alerts = await alert.find();
        res.json(alerts);
    }
    // /GET only one alert
alertController.getAlert = async(req, res) => {
        const getAle = await alert.findById(req.params.id);
        res.json(getAle);
    }
    // /POST new alert
alertController.createAlert = async(req, res) => {
        const newAlert = new alert(req.body);
        await newAlert.save();
        res.json({
            status: "Alert saved"
        });
    }
    // /PUT update alert
alertController.editAlert = async(req, res) => {
    const { id } = req.params;
    const oneAlert = {
        matricula: req.params.matricula,
        nombre_alumno: req.params.nombre_alumno,
        programa_educativo: req.params.programa_educativo,
        incidencia: req.params.incidencia,
        seguimiento: req.params.seguimiento
    };
    await alert.findByIdAndUpdate(id, { $set: oneAlert }, { new: true });
    res.json({
        status: "Alert Updated"
    })
}

// /DELETE alert
alertController.deleteAlert = async(req, res) => {
    await alert.findByIdAndRemove(req.params.id);
    res.json({
        status: "Alert Deleted"
    })
}

module.exports = alertController;