package ro.atm.management.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.Message;
import ro.atm.management.model.User;

@Repository
public interface RepoMessage extends CrudRepository<Message, Integer>{

	public List<Message> findByReceiver(User receiver);
	public List<Message> findByReceiverAndMessageType(User receiver, String messageType);
	
}
