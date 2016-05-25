package com.pingpongmessages;

import java.io.IOException;
import java.util.concurrent.TimeoutException;
import java.awt.Button;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.io.BufferedWriter;
import java.io.File;//for HTML
import java.io.FileWriter;

import com.rabbitmq.client.AMQP.BasicProperties;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection; //Crea una conexión con RabbitMQ
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.MessageProperties;
import com.rabbitmq.client.impl.Frame;

public class PingApp extends Frame implements WindowListener,ActionListener {
	


	public PingApp(int type, int channel) {
		super(type, channel);
		// TODO Auto-generated constructor stub
	}
	
	
	public static void sendPingMessage(Channel channel) throws IOException{
		
		String queueName = "TestDBG";
		//for(int i=1; i <= 10; i++) {
			String message = "PING_MESSAGE";
		    channel.basicPublish("", queueName, null, message.getBytes());
		    System.out.println("PingApp did send'" + message + "'"+" to the PongApp");		
		//}
		
		
	}
	
	public static void createConnection() throws IOException, TimeoutException{
		ConnectionFactory factory = new ConnectionFactory();
		
		
		// set connection info
		factory.setHost("localhost");
		factory.setUsername("Daniela");
		factory.setPassword("MiClave");
		
		// create the connection
		Connection connection = factory.newConnection();
		
		// create the channel
		Channel channel = connection.createChannel();
		
		
		sendPingMessage(channel);

	    channel.close();
	    connection.close();
	}

	public static void WebAppPing() throws TimeoutException{
		
		//Button b = new Button("Click me");
		String href = "PingEnviado.html";
		
		String target = "_blank";
		
		int numeroMensajes = 0;
		
		String html = "<div>"
				+ "<h2>MESSAGE DRIVEN PING-PONG</h2>"
				+"<a href="+href+" target="+target+"> Emitir mensaje PING</a>"
				+ "</div>";
		
		File pantallaHTML = new File("C:\\Users\\Daniela\\Desktop\\PingApp.html");
		try {
			createConnection();
			BufferedWriter bw = new BufferedWriter(new FileWriter(pantallaHTML));
			bw.write(html);
			bw.close();
		}catch(IOException e){
			e.printStackTrace();
		}
		
	}
	
	
	
	public static void main(String[] args) throws IOException, TimeoutException {
		
		WebAppPing();

	}

	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void windowOpened(WindowEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void windowClosing(WindowEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void windowClosed(WindowEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void windowIconified(WindowEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void windowDeiconified(WindowEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void windowActivated(WindowEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void windowDeactivated(WindowEvent e) {
		// TODO Auto-generated method stub
		
	}
}
