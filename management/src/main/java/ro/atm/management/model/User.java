package ro.atm.management.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ro.atm.management.converters.StatusAttributeConverter;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String email;

	@Column(name = "is_active")
	private Integer isActive;

	@JsonIgnore
	private String password;

	@Column(name = "user_type")
	private String userType;

	@ManyToMany(cascade = { CascadeType.ALL })
	@JoinTable(name = "user_roles", joinColumns = { @JoinColumn(name = "user_id") }, 
	inverseJoinColumns = {
			@JoinColumn(name = "role_id") })
	private Set<Role> userRoles;

	
	@Column(name="status")
	@Convert(converter = StatusAttributeConverter.class)
	private Status status;
	
	@ManyToMany(cascade = { CascadeType.ALL })
	@JoinTable(name = "anunturi_users", joinColumns = { @JoinColumn(name = "id_user") }, 
	inverseJoinColumns = {
			@JoinColumn(name = "id_anunt") })
	private Set<Anunt> anunturi;
	
	private String nume;
	private String prenume;
	private String phone;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getIsActive() {
		return isActive;
	}

	public void setIsActive(Integer isActive) {
		this.isActive = isActive;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public Set<Role> getUserRoles() {
		return userRoles;
	}

	public void setUserRoles(Set<Role> userRoles) {
		this.userRoles = userRoles;
	}
	
	
	
	

	public Set<Anunt> getAnunturi() {
		return anunturi;
	}

	public void setAnunturi(Set<Anunt> anunturi) {
		this.anunturi = anunturi;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
	
	

	public String getNume() {
		return nume;
	}

	public void setNume(String nume) {
		this.nume = nume;
	}

	public String getPrenume() {
		return prenume;
	}

	public void setPrenume(String prenume) {
		this.prenume = prenume;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", isActive=" + isActive + ", password=" + password
				+ ", userType=" + userType + "]";
	}

}
