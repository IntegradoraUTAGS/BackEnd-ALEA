const mongoose = require('mongoose');

//declarar esquema
let Schema = mongoose.Schema;

let logSchema = new Schema({
    idUsuario: {
        type: Schema.Types.String,
        ref: 'usuario'
    },
    strNombreFuncion: {
        type: String,
        ref: 'usuario'
    },
    nmbFecha: {
        type: Date, default: Date.now
    },
    strRequest:{
        type:String

    }
   
});
module.exports = mongoose.model('logFunction', logSchema);