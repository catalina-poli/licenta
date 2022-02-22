package ro.atm.management.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.dto.RegisterUserDto;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoUser;

@CrossOrigin(value = {"http://localhost:4200/"})
@RestController
@RequestMapping("/security/useri") 
public class UnsecuredUserController {

	@Autowired
	private RepoUser repoUser;
	
	
	@PostMapping("/register")
	public User registerUser(@RequestBody RegisterUserDto userDto) {
		User user = new User();
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		return repoUser.save(user);
	}
	
	@GetMapping("/test")
	public String test() {
		return "TEST HELLO";
	}
}
