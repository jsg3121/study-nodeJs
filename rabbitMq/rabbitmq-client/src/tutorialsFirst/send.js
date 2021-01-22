var amqp = require("amqplib/callback_api");
amqp.connect({
    protocol: "amqp",
    hostname: "localhost",
    port: 5672,
    username: "test1",
    password: "test1",
    vhost: "/"
}, // amqp를 연결하기 위한 접속자 정보와 포트번호
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
        var msgNotice = "공지사항 입니다!";
        var msgEvent = "이벤트 입니다!";
        var exchange = "all_logs";
        var args = process.argv.slice(2);
        var msgAll = args.slice(1).join(" ") || "모두알림";
        var serverity = args.length > 0 ? args[0] : "info";
        channel.assertQueue(notice, {
            durable: false
        });
        channel.assertQueue(event, {
            durable: false
        });
        channel.sendToQueue(notice, Buffer.from(msgNotice));
        channel.sendToQueue(event, Buffer.from(msgEvent));
        console.log(" [x] Sent %s", msgNotice);
        console.log(" [x] Sent %s", msgEvent);
        channel.assertExchange(exchange, "direct", {
            durable: false
        });
        channel.publish(exchange, serverity, Buffer.from(msgAll));
        console.log(" [x] Sent %s: '%s'", serverity, msgAll);
    });
});
