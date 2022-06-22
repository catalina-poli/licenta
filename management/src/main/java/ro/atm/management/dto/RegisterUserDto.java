package ro.atm.management.dto;

import java.util.List;
import java.util.Set;

import ro.atm.management.model.Role;

public class RegisterUserDto {

	private String email;
	private String password;
	private String nume;
	private String prenume;
	private String status;
	private String phone;
	
	private Set<Role> selectedRoles;
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Set<Role> getSelectedRoles() {
		return selectedRoles;
	}

	public void setSelectedRoles(Set<Role> selectedRoles) {
		this.selectedRoles = selectedRoles;
	}

	
	
	
	
	

}
