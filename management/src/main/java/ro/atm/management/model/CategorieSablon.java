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
@Table(name="categorii_sabloane")
public class CategorieSablon {

	

//create table categorii_sabloane(
//    parent_id int,
//    foreign key(parent_id) references categorii_sabloane(id)
//)engine=innodb;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
	private Integer id;
	
	@Column(name="category_name")
	private String categoryName;
	
	@ManyToOne
	@JoinColumn(name="parent_id")
	private CategorieSablon categorieParinte;
	
	@Lob
	private byte[] file;
	
	
	@Column(name="document_type")
	private String documentType;
	
	@Column(name="filename")
	private String filename;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public CategorieSablon getCategorieParinte() {
		return categorieParinte;
	}

	public void setCategorieParinte(CategorieSablon categorieParinte) {
		this.categorieParinte = categorieParinte;
	}

	public byte[] getFile() {
		return file;
	}

	public void setFile(byte[] file) {
		this.file = file;
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
	
	
	
	
}
