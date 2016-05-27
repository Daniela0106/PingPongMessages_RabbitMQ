function handleRequest() {

var amqp = require('amqplib/callback_api');
//var pingMessage;
//var x = document.getElementById("formMessage"); //Recibe los datos del form
//pingMessage = "";
//var messageAmount = 0;

//pingMessage = String(x.elements[0].value);  
//messageAmount = String(x.elements[1].value);  


amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = 'TestDBG';
      var msg = "PING_MESSAGE";

      ch.assertQueue(q, {durable: true});
      ch.sendToQueue(q, new Buffer(msg));
      //console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });
}
/*

function handleRequest() {
  
    var x = document.getElementById("formMessage"); //Recibe los datos del form
    pingMessage = "";
    var messageAmount = 0;
    
    pingMessage = String(x.elements[0].value);  
    messageAmount = String(x.elements[1].value);  
    
    if(pingMessage!="") {
      document.getElementById("mensajeEnviado").innerHTML =  pingMessage + " x " + messageAmount + " veces";
      sendRabbit();
        
    }else{
      messageAmount = 0;
      document.getElementById("mensajeEnviado").innerHTML = "No se pudo enviar nada";
    }
    
}

function sendRabbit() {
  document.getElementById("mensajeEnviado").innerHTML = "Entré a sendRabbit 1";  
  
//Source: https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
}*/