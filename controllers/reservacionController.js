const Reservacion = require('../models/Reservacion');
const Habitacion = require('../models/Habitacion');
const {EventEmitter} = require('events');
const reservacionEventEmitter = new EventEmitter();

exports.crearResevacion = async (req, res)=>{
    const {idhabitacion,nombreUsuario,inicioReserva,finalReserva}=req.body;
    let sessions;

    try {
        sessions = await Habitacion.startSession();
        sessions.startTransaction();


        const habitacion = await Habitacion.findById(idhabitacion);
        if(!habitacion.disponibilidad){
            return res.status(400).send('Habitacion no esta disponible')
    }

    const newReservacion = new Reservacion({habitacion:idhabitacion,nombreUsuario,inicioReserva,finalReserva});
    await newReservacion.save({session});

    habitacion.disponibilidad = false;
    habitacion.version += 1;
    await habitacion.save({session});

    await session.commitTransaction();
    session.endSession();

    reservacionEventEmitter.emit('newReservacion', newReservacion);
    res.status(201).send(newReservacion)

}catch (error) {
    if(session){
        await session.abortTansaction();
        session.endSeccion();
    }
        res.status(500).send(error.message);
    }
};

reservacionEventEmitter.on('newReservacion', async(reservacion) =>{
    console.log(`Reservacion confirmada far ${reservacion.nombreUsuario}`);
});