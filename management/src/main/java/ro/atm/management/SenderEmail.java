package ro.atm.management;

import com.sendgrid.*;
import java.io.IOException;

public class SenderEmail {
	
	/**
	 * 
	 * @param subjectText
	 * @param toAddress
	 * @param contentText
	 */
	public static void sendEmail(String subjectText, String toAddress, String contentText) {
		Email from = new Email("stroe242@gmail.com");
		String subject = subjectText;
		Email to = new Email(toAddress);
		Content content = new Content("text/html", contentText);
		Mail mail = new Mail(from, subject, to, content);

		SendGrid sg = new SendGrid("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"); // System.getenv("SENDGRID_API_KEY")
		Request request = new Request();
		try {
			request.setMethod(Method.POST);
			request.setEndpoint("mail/send");
			request.setBody(mail.build());
			Response response = sg.api(request);
			System.out.println(response.getStatusCode());
			System.out.println(response.getBody());
			System.out.println(response.getHeaders());
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}
	
}
