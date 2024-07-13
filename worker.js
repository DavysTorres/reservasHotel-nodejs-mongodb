const { consumeFromQueue } = require('./queue');

consumeFromQueue('reservaciones', (message) => {
  console.log(`Procesando reservacion: ${message}`);
});