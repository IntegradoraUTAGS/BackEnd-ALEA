const mongoose = require('mongoose');
const { Schema } = mongoose;

const alerts = new Schema({
    matricula: { type: Number, required: true },
    nombre_alumno: { type: String, required: false },
    programa_educativo: { type: String, required: true },
    incidencia: { type: String, required: true },
    seguimiento: { type: String, required: true }
});

module.exports = mongoose.model('Alerts', alerts);