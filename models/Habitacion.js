const mongoose = require('mongoose');

const habitacionSchema = new mongoose.Schema({
    numero:{
        type: String,
        required: true,
        unique: true
    },
    tipo:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    disponibilidad:{
        type: Boolean,
        default: true
    },
    version:{
        type: Number,
        default: 0
    },
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Habitacion', habitacionSchema)