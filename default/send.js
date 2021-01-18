const amqp = require("amqplib/callback_api");

amqp.connect("amqp://guest:guest@localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    let queue = "hello";
    let msg = "test success";

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(`1[x] Sent %s ${msg}`);
  });
});
