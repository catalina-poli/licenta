package ro.atm.management;

import com.sendgrid.*;
import java.io.IOException;

public class Example {
	public static void main(String[] args) throws IOException {
		Email from = new Email("stroe242@gmail.com");
		String subject = "Sending with SendGrid is Fun";
		Email to = new Email("spirescualex@gmail.com");
		Content content = new Content("text/plain", "and easy to do anywhere, even with Java");
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
			throw ex;
		}
	}
}
