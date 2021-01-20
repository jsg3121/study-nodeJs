#!/usr/bin/env node

var amqp = require("amqplib/callback_api");
// "amqp://device:device1234@localhost:5672/device"

var args = "info";

amqp.connect(
  {
    protocol: "amqp",
    hostname: "localhost",
    port: 5672,
    username: "test1",
    password: "test1",
    vhost: "/",
  },
  function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      var queue = "공지사항";

      channel.assertQueue(queue, {
        durable: false,
      });

      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );

      channel.consume(
        queue,
        function (msg) {
          console.log(" [x] Received %s", msg.content.toString());
        },
        {
          noAck: true,
        }
      );

      let exchange = "all_logs";

      channel.assertExchange(exchange, "direct", {
        durable: false,
      });

      channel.assertQueue("", { exclusive: true }, (error2, q) => {
        if (error2) {
          throw error2;
        }

        channel.bindQueue(q.queue, exchange, args);

        channel.consume(
          q.queue,
          (msg) => {
            console.log(
              " [x] %s: '%s'",
              msg.fields.routingKey,
              msg.content.toString()
            );
          },
          {
            noAck: true,
          }
        );
      });
    });
  }
);
