const mongoose = require('mongoose');
const { Schema } = mongoose;

const users = new Schema({
    // email: {type: String, required: true},
    // password: {type: String, required:true}
    id_alerta: { type: Schema.Types.String, ref: 'Alerts', required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    motherlastname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
}, {
    timestamps: true
});


module.exports = mongoose.model('Users', users);