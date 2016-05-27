//Consumer

var amqp = require('amqplib/callback_api');
var q = 'TestDBG';

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    

    ch.assertQueue(q, {durable: true});
    
    ch.consume(q, function(msg) {
    console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
    
    ch.sendToQueue(q, new Buffer("PONG_MESSAGE")); 
    console.log("Pong message enviado a", q);
    //Espera de 2 segundos:
    setTimeout(function() {
      
      console.log("PONG_MESSAGE enviado");
      conn.close(); process.exit(0) 
      
    }, 2000); 
    
  });
  

});
