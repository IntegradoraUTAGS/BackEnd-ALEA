const mongoose = require('mongoose');
const { Schema } = mongoose;

const users = new Schema({
    id_alerta: { type: Schema.Types.String, ref: 'Alerts', required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

module.exports = mongoose.model('Users', users);