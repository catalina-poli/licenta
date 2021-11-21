package ro.atm.management.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="anunturi")
public class Anunt {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
	private Integer id;
	private String titlu;
	private String continut;
	
	@Column(name="categorie_destinatar")
	private String categorieDestinatar;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitlu() {
		return titlu;
	}
	public void setTitlu(String titlu) {
		this.titlu = titlu;
	}
	public String getContinut() {
		return continut;
	}
	public void setContinut(String continut) {
		this.continut = continut;
	}
	public String getCategorieDestinatar() {
		return categorieDestinatar;
	}
	public void setCategorieDestinatar(String categorieDestinatar) {
		this.categorieDestinatar = categorieDestinatar;
	}
	
	
}
