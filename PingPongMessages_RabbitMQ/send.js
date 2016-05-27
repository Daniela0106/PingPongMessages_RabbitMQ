/*****LA APLICACIÓN ENVÍA UN PING_MESSAGE AL MESSAGE BROKER RabbitMQ */
var amqp = require('amqplib/callback_api');
var contador="0";

amqp.connect('amqp://localhost', function(err, conn) {
    
    conn.createChannel(function(err, ch) {
      var q = 'TestDBG';
      var msg = "PING_MESSAGE";

      ch.assertQueue(q, {durable: true});
      ch.sendToQueue(q, new Buffer(msg));
      console.log("["+ contador+1 + "]" + "enviado %s", msg);
    });
    
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });