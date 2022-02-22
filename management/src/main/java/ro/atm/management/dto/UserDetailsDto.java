package ro.atm.management.dto;

import java.util.Set;

import ro.atm.management.model.Role;

public class UserDetailsDto {

	private Set<Role> userRoles;
	private String username;

	public UserDetailsDto() {
	}

	public UserDetailsDto(Set<Role> userRoles, String username) {
		this.userRoles = userRoles;
		this.username = username;
	}

	public Set<Role> getUserRoles() {
		return userRoles;
	}

	public void setUserRoles(Set<Role> userRoles) {
		this.userRoles = userRoles;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
