package ro.atm.management.controllers;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.dto.UserDetailsDto;
import ro.atm.management.model.Role;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoRole;
import ro.atm.management.repo.RepoUser;

@CrossOrigin(value = {"http://localhost:4200/"})
@RestController
@RequestMapping("/rest/useri") 
public class UserController {

	@Autowired
	private RepoUser repoUser;
	
	@Autowired
	private RepoRole repoRole;
	
	@GetMapping("/all")
	public Iterable<User> getUsers(){
		return repoUser.findAll();
	}
	
	@GetMapping("/all-cerere")
	public List<User> getUsersForCerere(){
		Iterable<Role> roles = this.repoRole.findAllById(Stream.of(1,2,4,5).collect(Collectors.toList()));
		List<User> usersWithRoles = this.repoUser.findByUserRolesIn(roles);
		return usersWithRoles;
	}
	
	@PostMapping("/register")
	public User saveUser(@RequestBody User user) {
		return repoUser.save(user);
	}
	
	@GetMapping("/my-details")
	public UserDetailsDto getMyDetails(Principal principal) {
		String emailUserAuthenticated = principal.getName();
		UserDetailsDto userDetails = new UserDetailsDto();
		userDetails.setUsername(emailUserAuthenticated);
		
		User theUser = this.repoUser.findByEmail(emailUserAuthenticated).get();
		userDetails.setUserRoles(theUser.getUserRoles());
		return userDetails;
	}
	
}
