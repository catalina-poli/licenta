package ro.atm.management.service;

import java.security.Principal;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.atm.management.exceptions.InexistingUserException;
import ro.atm.management.model.Message;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoMessage;

@Service
public class MessageService {
	
	public static enum MessageType{
		SYSTEM, CHAT
	}

	
	public static final String NEW_MESSAGE_ANUNT = "Un nou anunt";
	
	@Autowired
	private RepoMessage repoMessage;
	
	@Autowired
	private UserService userService;
	
	public Message sendMessage(Principal principal, User receiver, String messageContents, MessageType messageType) throws InexistingUserException{
		
		Optional<User> userDestinatarOptional = this.userService.getUser(principal);
		if(!userDestinatarOptional.isPresent()) {
			throw new InexistingUserException();
		}
		
		User user = userDestinatarOptional.get();
		Message message = new Message();
		message.setContents(messageContents);
		message.setDatePosted(new Date());
		message.setMessageType(messageType.equals(MessageType.SYSTEM) ? "system" : "chat");
		message.setSender(user);
		message.setReceiver(receiver);
		
		return this.repoMessage.save(message);
				
		
	}
	
}
