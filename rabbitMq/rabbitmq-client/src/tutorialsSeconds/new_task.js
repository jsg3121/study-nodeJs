const amqp = require("amqplib/callback_api");

amqp.connect(
  {
    protocol: "amqp",
    hostname: "localhost",
    port: 5672,
    username: "test1",
    password: "test1",
    vhost: "/",
  },
  (error, connection) => {
    if (error) {
      throw error;
    }
    connection.createChannel((error2, channel) => {
      if (error2) {
        throw error2;
      }

      let queue = "task_queue";
      let msg = process.argv.slice(2).join(" ") || "Work Queue Test!!";

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true,
      });

      console.log(" [x] Sent " + msg);
    });

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  }
);
