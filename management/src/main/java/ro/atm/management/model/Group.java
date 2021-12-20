package ro.atm.management.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "groups_of_users")
public class Group {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "nume_grup")
	private String numeGrup;

	@ManyToOne
	@JoinColumn(name = "parent_group")
	private Group parentGroup;

	@ManyToOne
	@JoinColumn(name = "in_charge")
	private User userInCharge;

	@ManyToMany(cascade = { CascadeType.ALL })
	@JoinTable(name = "groups_students", joinColumns = { @JoinColumn(name = "id_group") }, inverseJoinColumns = {
			@JoinColumn(name = "id_student") })
	private Set<User> students = new HashSet<>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNumeGrup() {
		return numeGrup;
	}

	public void setNumeGrup(String numeGrup) {
		this.numeGrup = numeGrup;
	}

	public Group getParentGroup() {
		return parentGroup;
	}

	public void setParentGroup(Group parentGroup) {
		this.parentGroup = parentGroup;
	}

	public User getUserInCharge() {
		return userInCharge;
	}

	public void setUserInCharge(User userInCharge) {
		this.userInCharge = userInCharge;
	}

	public Set<User> getStudents() {
		return students;
	}

	public void setStudents(Set<User> students) {
		this.students = students;
	}
	
	

}
