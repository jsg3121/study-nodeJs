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

    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      let exchange = "topic_logs";
      let args = process.argv.slice(2);
      let key = args.length > 0 ? args[0] : "어나니머스 인포";
      let msg = args.slice(1).join("") || "Hello World!";

      channel.assertExchange(exchange, "topic", {
        durable: false,
      });

      channel.publish(exchange, key, Buffer.from(msg));
      console.log(` [x] Sent ${key} ${msg}`);
    });

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  }
);
