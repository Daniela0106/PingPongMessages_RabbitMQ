//Consumer

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'TestDBG';

    ch.assertQueue(q, {durable: true});
    console.log(" [*] Esperando mensajes de la cola %s. Para salir presione CTRL+C", q);
    //Espera de 2 segundos:
    setTimeout(function() { conn.close(); process.exit(0) }, 2000); 
    ch.consume(q, function(msg) {
      console.log(" Se recibió %s", msg.content.toString());
      ch.sendToQueue(q, new Buffer("PONG_MESSAGE")); 
          console.log("Pong Message Enviado");
   
    }, {noAck: true});
  });
});





/*
function callback(a){
    return function(){
    	alert("Hello " + a);
    }
}
var a = "world";
setTimeout(callback(a), 2000);
a = "Stac Overflow";*/