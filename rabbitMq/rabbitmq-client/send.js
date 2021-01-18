#!/usr/bin/env node

var amqp = require("amqplib/callback_api");

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

      var notice = "공지사항";
      var event = "이벤트";

      var msg = "Hello World!";

      channel.assertQueue(notice, {
        durable: false,
      });

      channel.assertQueue(event, {
        durable: false,
      });

      channel.sendToQueue(notice, Buffer.from(msg));
      channel.sendToQueue(event, Buffer.from(msg));

      console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  }
);
