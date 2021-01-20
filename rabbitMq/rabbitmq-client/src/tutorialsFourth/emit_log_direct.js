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

      let exchange = "direct";
      let args = process.argv.slice(2);
      let msg = args.slice(1).join(" ") || "direct test !!!";
      let serverity = args.length > 0 ? args[0] : "info";

      channel.assertExchange(exchange, "direct", {
        durable: false,
      });

      channel.publish(exchange, serverity, Buffer.from(msg));
      console.log(` [x] Sent ${serverity} ${msg}`);
    });

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  }
);
