var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, connection) => {
  if (err) {
    throw err;
  }

  connection.createChannel(function (err, channel) {
    if (err) {
      throw err;
    }

    const exchange = "createdQueue";

    channel.assertExchange(exchange, "fanout", {
      durable: false,
    });

    channel.assertQueue("", { exclusive: true }, function (err, q) {
      if (err) {
        throw err;
      }

      channel.bindQueue(q.queue, exchange, "");

      channel.consume(
        q.queue,
        function (msg) {
          if (msg.content) {
            console.log(typeof msg);

            console.log(" Received: ", msg.content.toString());
          }
        },

        {
          noAck: true,
        }
      );
    });
  });
});
