package ro.atm.management.controllers;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.SSLEmail;
import ro.atm.management.dto.RegisterUserDto;
import ro.atm.management.model.Role;
import ro.atm.management.model.Status;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoRole;
import ro.atm.management.repo.RepoUser;

@CrossOrigin(value = {"http://localhost:4200/"})
@RestController
@RequestMapping("/security/useri") 
public class UnsecuredUserController {

	@Autowired
	private RepoUser repoUser;
	
	@Autowired
	private RepoRole repoRole;
	
	
	@GetMapping("/all-roles")
	public Iterable<Role> getAllRoles(){
		return this.repoRole.findAll();
	}
	
	@GetMapping("/confirm-account/{userId}")
	public Map<String, String> confirmAccount(@PathVariable("userId") int id){
		User user = repoUser.findById(id).get();
		user.setIsActive(1);
		repoUser.save(user);
		Map<String, String> raspuns = new HashMap<>();
		raspuns.put("RASPUNS", "OK");
		return raspuns;
	}
	
	@PostMapping("/register")
	public User registerUser(@RequestBody RegisterUserDto userDto) {
		User user = new User();
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		user.setNume(userDto.getNume());
		user.setPrenume(userDto.getPrenume());
		user.setPhone(userDto.getPhone());
		user.setStatus(Status.valueOf(userDto.getStatus()));
		user.setIsActive(0);
		
		
		List<Integer> roleIds = userDto.getSelectedRoles().stream().map(x -> x.getId()).collect(Collectors.toList());
		Iterable<Role> rolesFromDb = this.repoRole.findAllById(roleIds); 
		Set<Role> rolesForUser = new HashSet<>();
		for(Role role: rolesFromDb) {
			rolesForUser.add(role);
		}
		user.setUserRoles(rolesForUser);
		
		User userSaved = repoUser.save(user);
		
		SSLEmail.sendTheEmailForActivation(userSaved.getEmail(), userSaved.getId());
		return userSaved;
	}
	
	@GetMapping("/test")
	public String test() {
		return "TEST HELLO";
	}
}
