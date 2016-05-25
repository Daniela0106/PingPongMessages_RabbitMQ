package com.pingpongmessages;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.QueueingConsumer;
import com.rabbitmq.client.QueueingConsumer.Delivery;

public class PongApp {
	
	public static void sendPongMessage(Channel channel) throws IOException{
		
		String queueName = "TestDBG";
			String message = "PONG_MESSAGE";
		    channel.basicPublish("", queueName, null, message.getBytes());
		    System.out.println(" [x] Sent '" + message + "'");		
		
	}
	
	
	public static void main(String[] args) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		
		// set connection info
		factory.setHost("localhost");
		factory.setUsername("guest");
		factory.setPassword("guest");
		
		// create the connection
		Connection connection = factory.newConnection();
		
		// create the channel
		Channel channel = connection.createChannel();
		
		QueueingConsumer consumer = new QueueingConsumer(channel);
		channel.basicConsume("TestDBG", consumer);

		boolean removeAllUpTo = true;
		while(true) {
			Delivery delivery = consumer.nextDelivery(1000);
			if (delivery == null) break;
			if (processMessage(delivery)) {
				long deliveryTag = delivery.getEnvelope().getDeliveryTag();
				channel.basicAck(deliveryTag, removeAllUpTo);
				
			}
		}
		
		channel.close();
		connection.close();
	}

	private static boolean processMessage(Delivery delivery) throws UnsupportedEncodingException {
		String msg = new String(delivery.getBody(), "UTF-8");
		System.out.println("[x] Recv: redeliver=" + delivery.getEnvelope().isRedeliver() + ", msg='" + msg + "'");
		return true;
	}
}
