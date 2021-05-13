const amqp = require("amqplib/callback_api");
var count = 0;
amqp.connect("amqp://localhost", (err, connection) => {
  if (err) {
    throw err;
  }

  setInterval(() => {
    count += 1;
    connection.createChannel((channelError, channel) => {
      if (channelError) {
        throw channelError;
      }

      const queue = "createdQueue";

      const message = "Message " + count + " received successfully";

      channel.assertExchange(queue, "fanout", { durable: false });

      channel.publish(queue, "", Buffer.from(JSON.stringify(message)));

      console.log("Message " + count + " send successfully");
    });
  }, 2000);
});
