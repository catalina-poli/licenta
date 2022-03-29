package ro.atm.management.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "messages")
public class Message {

	public static interface MessageTypeConstants {
		public String SYSTEM = "system";
		public String CHAT = "chat";
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String contents;

//	 id_user_sender int,
//	    id_user_receiver int not null, 
//	    message_type enum('system', 'chat'),

	@Column(name = "message_type")
	private String messageType;

	@ManyToOne
	@JoinColumn(name = "id_user_sender")
	private User sender;

	@ManyToOne
	@JoinColumn(name = "id_user_receiver")
	private User receiver;

	@Column(name="date_posted")
	private Date datePosted;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getContents() {
		return contents;
	}

	public void setContents(String contents) {
		this.contents = contents;
	}

	public String getMessageType() {
		return messageType;
	}

	public void setMessageType(String messageType) {
		this.messageType = messageType;
	}

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public User getReceiver() {
		return receiver;
	}

	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}

	public Date getDatePosted() {
		return datePosted;
	}

	public void setDatePosted(Date datePosted) {
		this.datePosted = datePosted;
	}
	
	

}
