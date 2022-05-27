package ro.atm.management.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
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
	
	@Column(name="document_type")
	private String documentType;
	
	@Column(name="filename")
	private String filename;
	
	@ManyToOne
	@JoinColumn(name="id_poster")
	private User poster;
	
	@Lob
	private byte[] contents;
	
	
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
	public String getDocumentType() {
		return documentType;
	}
	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public byte[] getContents() {
		return contents;
	}
	public void setContents(byte[] contents) {
		this.contents = contents;
	}
	public User getPoster() {
		return poster;
	}
	public void setPoster(User poster) {
		this.poster = poster;
	}
	
	
	
	
}
