const mongoose = require('mongoose');
const { Schema } = mongoose;

const carreras = new Schema({
    nombre: { type: String, required: true },
    especialidad: { type: String, required: true },
    abreviatura: { type: String, required: true }
});

module.exports = mongoose.model('Carreras', carreras);