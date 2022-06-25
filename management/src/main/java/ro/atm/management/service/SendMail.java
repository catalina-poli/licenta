package ro.atm.management.service;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendMail {

	public static void sendEmail(String to, String subject, String text) {

		// Assuming you are sending email from through gmails smtp
		String from = "managementapp1234@gmail.com";
		String host = "smtp.gmail.com";

		// Get system properties
		Properties prop = System.getProperties();

		// Setup mail server
		prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true"); //TLS

		// Get the Session object.// and pass username and password
		Session session = Session.getInstance(prop, new javax.mail.Authenticator() {

			protected PasswordAuthentication getPasswordAuthentication() {

				return new PasswordAuthentication("managementapp1234@gmail.com", "joinTHEarmy0799079807");

			}

		});

		// Used to debug SMTP issues
		session.setDebug(true);

		try {
			// Create a default MimeMessage object.
			MimeMessage message = new MimeMessage(session);

			// Set From: header field of the header.
			message.setFrom(new InternetAddress(from));

			// Set To: header field of the header.
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

			// Set Subject: header field
			message.setSubject(subject);

			// Now set the actual message
			message.setText(text);

			System.out.println("sending...");
			// Send message
			Transport.send(message);
			System.out.println("Sent message successfully....");
		} catch (MessagingException mex) {
			mex.printStackTrace();
		}
	}

	public static void main(String[] args) {

		sendEmail("spirescualex@gmail.com", "Hello from java email", "CONTINUT EMAIL HERE!!!");

	}

}
