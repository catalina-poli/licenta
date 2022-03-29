package ro.atm.management.controllers;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.model.Message;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoMessage;
import ro.atm.management.repo.RepoUser;
import ro.atm.management.service.AnuntService;

@RestController
@RequestMapping("/rest/messages")
public class MessageController {

	@Autowired
	private RepoMessage repoMessage;
	
	@Autowired
	private RepoUser repoUser;
	
	@Autowired
	private AnuntService anuntService;
	
	@GetMapping("/by-user-logged-in")
	public List<Message> getMyMessages(Principal principal){
		Optional<User> userLogged = this.repoUser.findByEmail(principal.getName());
		User user = userLogged.get();
		
		List<Message> myMessages = this.repoMessage.findByReceiver(user);
		return myMessages;
	}
	
	@PostMapping("/save-notification/{idReceiver}")
	public Message saveMessageNotification(@RequestBody Message message, @PathVariable("idReceiver") int idReceiver) {
//		User userReceiver = this.repoUser.findById(idReceiver).get();
//		message.setReceiver(userReceiver);
//		message.setDatePosted(new Date());
//		message.setMessageType(Message.MessageTypeConstants.SYSTEM);
//		Message messageSaved = this.repoMessage.save(message);
		
		Message messageSaved = this.anuntService.saveNotificationMessage(idReceiver, message.getContents());
		return messageSaved;
	}
	
	@PostMapping("/save-chat/{idReceiver}")
	public Message saveMessageChat(Principal principal, @RequestBody Message message, @PathVariable("idReceiver") int idReceiver) {
		User userReceiver = this.repoUser.findById(idReceiver).get();
		message.setReceiver(userReceiver);
		message.setDatePosted(new Date());
		message.setMessageType(Message.MessageTypeConstants.CHAT);
		Optional<User> userLogged = this.repoUser.findByEmail(principal.getName());
		User user = userLogged.get();
		message.setSender(user);
		Message messageSaved = this.repoMessage.save(message);
		return messageSaved;
	}
	
	@DeleteMapping("/delete/{id}")
	public Message deleteMessage(@PathVariable("id") int id) {
		Message m = this.repoMessage.findById(id).get();
		this.repoMessage.delete(m);
		return m;
	}
}
