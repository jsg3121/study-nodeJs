const amqp = require("amqplib/callback_api");

let args = process.argv.slice(2);

if (args.length == 0) {
  console.log(`Usage: recieve_logs_topic.js <facility><serverity>`);
  process.exit(1);
}

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

    connection.createChannel((error, channel) => {
      if (error) {
        throw error;
      }

      let exchange = "topic_logs";

      channel.assertExchange(exchange, "topic", {
        durable: false,
      });

      channel.assertQueue(
        "",
        {
          exclusive: true,
        },
        (error2, queue) => {
          if (error2) {
            throw error2;
          }

          console.log(` [*] Waiting for logs, To exit press 컨트롤 + ㅊ`);

          args.forEach((key) => {
            channel.bindQueue(queue.queue, exchange, key);
          });

          channel.consume(
            queue.queue,
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
