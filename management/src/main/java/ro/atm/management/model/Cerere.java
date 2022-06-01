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
@Table(name = "cereri")
public class Cerere {

	@Id // primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
	private Integer id;

	@Column(name = "date_created")
	private Date dateCreated;

//	('restanta', 'invoire', 'permisie'),
	@Column(name = "type_cerere")
	private String typeCerere;

	// @Column(name="user_id")
	// private Integer userId;
	
	private Integer archived;

	@ManyToOne
	@JoinColumn(name = "user_id") // foreign key
	private User userAssociated;
	
	@ManyToOne
	@JoinColumn(name = "id_type") // foreign key
	private CerereType cerereType;
	
	
	@Column(name = "date_start")
	private Date dateStart;
	@Column(name = "date_end")
	private Date dateEnd;

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

	public Date getDateStart() {
		return dateStart;
	}

	public void setDateStart(Date dateStart) {
		this.dateStart = dateStart;
	}

	public Date getDateEnd() {
		return dateEnd;
	}

	public void setDateEnd(Date dateEnd) {
		this.dateEnd = dateEnd;
	}

	public CerereType getCerereType() {
		return cerereType;
	}

	public void setCerereType(CerereType cerereType) {
		this.cerereType = cerereType;
	}

	public Integer getArchived() {
		return archived;
	}

	public void setArchived(Integer archived) {
		this.archived = archived;
	}
	
	

//    user_id int,
//    foreign key(user_id) references users(id)

}
