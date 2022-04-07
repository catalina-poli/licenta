package ro.atm.management.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
	
	
	
	
}
