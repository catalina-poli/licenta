package ro.atm.management.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.atm.management.model.Message;
import ro.atm.management.model.Role;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoMessage;
import ro.atm.management.repo.RepoRole;
import ro.atm.management.repo.RepoUser;

@Service
public class AnuntService {

	@Autowired
	private RepoMessage repoMessage;

	@Autowired
	private RepoUser repoUser;

	@Autowired
	private RepoRole repoRole;

	public Message saveNotificationMessage(int idReceiver, String contents) {
		User userReceiver = this.repoUser.findById(idReceiver).get();
		Message message = new Message();
		message.setContents(contents);
		message.setReceiver(userReceiver);
		message.setDatePosted(new Date());
		message.setMessageType(Message.MessageTypeConstants.SYSTEM);
		Message messageSaved = this.repoMessage.save(message);
		return messageSaved;
	}

	private void saveNotificationMessageBulk(List<Integer> idReceivers, String contents) {
		for (Integer idReceiver : idReceivers) {
			User userReceiver = this.repoUser.findById(idReceiver).get();
			Message message = new Message();
			message.setContents(contents);
			message.setReceiver(userReceiver);
			message.setDatePosted(new Date());
			message.setMessageType(Message.MessageTypeConstants.SYSTEM);
			Message messageSaved = this.repoMessage.save(message);
		}
	}

	public void saveNotificationMessageBulkCategory(String contents, String userRole) {

		Role userRoleStudent = this.repoRole.findByRoleName(userRole);
		List<Role> listaRoles = Stream.of(userRoleStudent).toList();
		List<User> students = this.repoUser.findByUserRolesIn(listaRoles);
		List<Integer> userIds = students.stream().map(x -> x.getId()).toList();

		this.saveNotificationMessageBulk(userIds, contents);

	}

}
