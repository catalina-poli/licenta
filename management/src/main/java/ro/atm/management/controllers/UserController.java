package ro.atm.management.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.dto.UserDetailsDto;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoUser;

@CrossOrigin(value = {"http://localhost:4200/"})
@RestController
@RequestMapping("/rest/useri") 
public class UserController {

	@Autowired
	private RepoUser repoUser;
	
	@GetMapping("/all")
	public Iterable<User> getUsers(){
		return repoUser.findAll();
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
