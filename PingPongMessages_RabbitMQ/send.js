/*****LA APLICACIÓN ENVÍA UN PING_MESSAGE AL MESSAGE BROKER RabbitMQ */

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    
    conn.createChannel(function(err, ch) {
      var q = 'TestDBG';
      var msg = "PING_MESSAGE";

      ch.assertQueue(q, {durable: true});
      ch.sendToQueue(q, new Buffer(msg));
      console.log("[Ping dice] " + msg + " enviado");
      
      setTimeout(function() {
        
        ch.consume(q, function(msg) {
        if(msg="PONG_MESSAGE"){ 
            console.log("[Ping dice ]", msg.content.toString(), " recibido");
            conn.close(); process.exit(0)    
          }
        }, {noAck: true});   
          conn.close(); process.exit(0)    
      }, 60000);

    });
  });