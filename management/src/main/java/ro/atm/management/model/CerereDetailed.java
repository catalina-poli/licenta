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
@Table(name = "cereri_detailed")
public class CerereDetailed {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
	private Integer id;

	@Column(name = "date_created")
	private Date dateCreated;

	@Column(name = "type_cerere")
	private String typeCerere; // `type_cerere` enum('restanta','invoire','permisie') DEFAULT NULL,

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "date_start")
	private Date dateStart;

	@Column(name = "date_end")
	private Date dateEnd;

	private String localitate;

	private String judet;
	@Column(name = "ora_plecare")
	private Integer oraPlecare;
	@Column(name = "ora_sosire")
	private Integer oraSosire;

	private String motiv;
	
	private Integer archived;


	@Column(name = "modalitate_deplasare")
	private String modalitateDeplasare;

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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public String getLocalitate() {
		return localitate;
	}

	public void setLocalitate(String localitate) {
		this.localitate = localitate;
	}

	public String getJudet() {
		return judet;
	}

	public void setJudet(String judet) {
		this.judet = judet;
	}

	public Integer getOraPlecare() {
		return oraPlecare;
	}

	public void setOraPlecare(Integer oraPlecare) {
		this.oraPlecare = oraPlecare;
	}

	public Integer getOraSosire() {
		return oraSosire;
	}

	public void setOraSosire(Integer oraSosire) {
		this.oraSosire = oraSosire;
	}

	public String getMotiv() {
		return motiv;
	}

	public void setMotiv(String motiv) {
		this.motiv = motiv;
	}

	public String getModalitateDeplasare() {
		return modalitateDeplasare;
	}

	public void setModalitateDeplasare(String modalitateDeplasare) {
		this.modalitateDeplasare = modalitateDeplasare;
	}

	public Integer getArchived() {
		return archived;
	}

	public void setArchived(Integer archived) {
		this.archived = archived;
	}
	
	

}
