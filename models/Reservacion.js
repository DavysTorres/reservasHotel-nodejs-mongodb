const mongoose = require('mongoose');

const reservacionSchema = new mongoose.Schema({
    nombreUsuario:{
        type: String,
        required: true
    },
    idhabitacion:{
        type: String,
        required: true
    },
    inicioReserva:{
        type: Date,
        required: true
    },
    finalReserva:{
        type: Date,
        required: true
    },
    estado:{
        type: String,
        default: 'pendiente'
    },
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Reservacion', reservacionSchema )