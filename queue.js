const amqp = require('amqplib');

async function sendToQueue(queue, message) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(message));
  setTimeout(() => {
    connection.close();
  }, 500);
}

async function consumeFromQueue(queue, callback) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      callback(msg.content.toString());
      channel.ack(msg);
    }
  });
}
module.exports = {sendToQueue, consumeFromQueue};