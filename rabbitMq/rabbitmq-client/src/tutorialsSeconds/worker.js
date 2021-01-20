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

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.prefetch(1);

      channel.consume(
        queue,
        (msg) => {
          let secs = msg.content.toString().split(".").length - 1;
          console.log(" [x] Received" + msg.content.toString());
          setTimeout(() => {
            console.log(" [x] Done");
            channel.ack(msg);
          }, secs * 1000);
        },
        {
          noAck: false,
        }
      );
    });
  }
);
