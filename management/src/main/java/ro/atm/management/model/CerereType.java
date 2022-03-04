package ro.atm.management.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="cereri_type")
public class CerereType {

	@Id // primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
	private Integer id;
	
	@Column(name="type_cerere")
	private String typeCerere;
	
	private Integer intrerupere;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTypeCerere() {
		return typeCerere;
	}

	public void setTypeCerere(String typeCerere) {
		this.typeCerere = typeCerere;
	}

	public Integer getIntrerupere() {
		return intrerupere;
	}

	public void setIntrerupere(Integer intrerupere) {
		this.intrerupere = intrerupere;
	}
	
	
	
}
