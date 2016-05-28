/*****LA APLICACIÓN RECIBE UN PING_MESSAGE DESDE EL MESSAGE BROKER RabbitMQ */

var amqp = require('amqplib/callback_api');
var q = 'TestDBG';

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertQueue(q, {durable: true});
    ch.consume(q, function(msg) {
    console.log("[Pong dice] ", msg.content.toString(), " recibido");
    }, {noAck: true});
    
    setTimeout(function() {
    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, new Buffer("PONG_MESSAGE")); 
    console.log("[Pong dice] PONG_MESSAGE enviado a", q);
    conn.close(); process.exit(0) 
    
  }, 2000); //Espera de 2 segundos

  });
  

  
});