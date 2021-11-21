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
@Table(name="cereri")
public class Cerere {

	@Id // primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
	private Integer id;
	
	@Column(name="date_created")
	private Date dateCreated;
	
//	('restanta', 'invoire', 'permisie'),
	@Column(name="type_cerere")
	private String typeCerere;
	
	// @Column(name="user_id")
	// private Integer userId;
	
	@ManyToOne
	@JoinColumn(name="user_id") // foreign key
	private User userAssociated;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public String getTypeCerere() {
		return typeCerere;
	}

	public void setTypeCerere(String typeCerere) {
		this.typeCerere = typeCerere;
	}

	public User getUserAssociated() {
		return userAssociated;
	}

	public void setUserAssociated(User userAssociated) {
		this.userAssociated = userAssociated;
	}



	
	
//    user_id int,
//    foreign key(user_id) references users(id)
	
}
