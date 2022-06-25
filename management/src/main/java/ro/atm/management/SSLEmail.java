package ro.atm.management;


import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;

public class SSLEmail {

	/**
	 * Outgoing Mail (SMTP) Server requires TLS or SSL: smtp.gmail.com (use
	 * authentication) Use Authentication: Yes Port for SSL: 465
	 */
	public static void sendTheEmailForActivation(String toEmail, int userId){
		final String fromEmail = "manag@localhost.com"; // requires valid gmail id
		final String password = "1234"; // correct password for gmail id
//		final String toEmail = "jim@localhost.com";//  "spirescualex@gmail.com"; // can be any email id

		System.out.println("SSLEmail Start");
		Properties props = new Properties();
		props.put("mail.smtp.host", "127.0.0.1"); // SMTP Host
//		props.put("mail.smtp.socketFactory.port", "465"); // SSL Port
//		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory"); // SSL Factory Class
//		props.put("mail.smtp.auth", "true"); // Enabling SMTP Authentication
		props.put("mail.smtp.port", "25"); // SMTP Port

		Authenticator auth = new Authenticator() {
			// override the getPasswordAuthentication method
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(fromEmail, password);
			}
		};

		Session session = Session.getDefaultInstance(props, auth);
		System.out.println("Session created");
		EmailUtil.sendEmail(session, toEmail, "SSLEmail Testing Subject", "To confirm account click <a href=\"http://localhost:8080/security/useri/confirm-account/"+userId+"\">Here</a>");

		

	}

}