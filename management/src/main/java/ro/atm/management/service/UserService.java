package ro.atm.management.service;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.atm.management.model.Role;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoUser;

@Service
public class UserService {

	@Autowired
	private RepoUser repoUser;
	
	public Optional<User> getUser(Principal principal){
		return this.repoUser.findByEmail(principal.getName());
	}
	
	public boolean isAdmin(User user) {
		for(Role role : user.getUserRoles()) {
			if(role.getRoleName().equals("ADMIN")) {
				return true;
			}
		}
		return false;
	}
	
	public boolean isStudent(User user) {
		for(Role role : user.getUserRoles()) {
			if(role.getRoleName().equals("STUDENT")) {
				return true;
			}
		}
		return false;
	}
	
	public boolean isComandant(User user) {
		for(Role role : user.getUserRoles()) {
			if(role.getRoleName().equals("COMANDANT")) {
				return true;
			}
		}
		return false;
	}
	
	public boolean isSecretar(User user) {
		for(Role role : user.getUserRoles()) {
			if(role.getRoleName().equals("SECRETAR")) {
				return true;
			}
		}
		return false;
	}
	
}
