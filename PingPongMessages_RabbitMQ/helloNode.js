console.log('Yes, I did send the message to q');

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'TestDBG';
    var msg = 'PING_MESSAGE';

    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, new Buffer(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});

//Source: https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html