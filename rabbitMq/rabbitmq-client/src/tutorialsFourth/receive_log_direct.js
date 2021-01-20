const amqp = require("amqplib/callback_api");

let args = process.argv.slice(2);

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

    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      let exchange = "direct";
      channel.assertExchange(exchange, "direct", {
        durable: false,
      });

      channel.assertQueue(
        "",
        {
          exclusive: true,
        },
        (error2, q) => {
          if (error2) {
            throw error2;
          }

          console.log(" -----------------");

          args.forEach((serverity) => {
            channel.bindQueue(q.queue, exchange, serverity);
          });

          channel.consume(
            q.require,
            (msg) => {
              console.log(
                ` [x] ${msg.fields.routingKey} ${msg.content.toString()}`
              );
            },
            {
              noAck: true,
            }
          );
        }
      );
    });
  }
);
