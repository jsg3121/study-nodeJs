#!/usr/bin/env node

var amqp = require("amqplib/callback_api");
// "amqp://device:device1234@localhost:5672/device"
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

      var queue = "hello";

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
    });
  }
);
