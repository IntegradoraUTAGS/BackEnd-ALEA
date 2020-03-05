const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuario = new Schema({
    nombre: {type: String, required: true},
    apellido_paterno: {type: String, required: true},
    apellido: {type: String, required: true},
    apellido_materno: {type: String, required: true},
    password: {type: String, required:true},
    confirmar_password: {type: String, required:true},
    role: {type: String, required: true},
    fecha: {type: Date, required: true},
});

module.exports = mongoose.model('Usuarios', usuario);