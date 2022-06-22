package ro.atm.management.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Spliterator;
import java.util.Spliterators;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.dto.UserDetailsDto;
import ro.atm.management.model.CustomFlow;
import ro.atm.management.model.CustomFlowMember;
import ro.atm.management.model.Role;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoCustomFlow;
import ro.atm.management.repo.RepoCustomFlowMember;
import ro.atm.management.repo.RepoRole;
import ro.atm.management.repo.RepoUser;
import ro.atm.management.service.UserService;

@CrossOrigin(value = {"http://localhost:4200/"})
@RestController
@RequestMapping("/rest/useri") 
public class UserController {

	@Autowired
	private RepoUser repoUser;
	
	@Autowired
	private RepoRole repoRole;
	
	@Autowired
	private RepoCustomFlow repoCustomFlow;
	
	@Autowired
	private RepoCustomFlowMember repoCustomFlowMember;
	
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/all")
	public Iterable<User> getUsers(){
		return repoUser.findAll();
	}
	
	@GetMapping("/all-cerere")
	public List<User> getUsersForCerere(){
//		Iterable<Role> roles = this.repoRole.findAllById(Stream.of(1,2,4,5).collect(Collectors.toList()));
		
		List<Role> roles = this.repoRole.findByRoleNameIn(Stream.of(Role.RoleTypes.ADMIN, Role.RoleTypes.COMANDANT, Role.RoleTypes.PROFESOR, Role.RoleTypes.SECRETAR).toList());
		List<User> usersWithRoles = this.repoUser.findByUserRolesIn(roles);
		return usersWithRoles;
	}
	
	
	
	@GetMapping("/all-users-for-add-to-flow/{customFlowId}")
	public List<User> getUsersToAddToFlow(@PathVariable("customFlowId")int customFlowId){
		CustomFlow cf = this.repoCustomFlow.findById(customFlowId).get();
		List<CustomFlowMember> cfMembers = this.repoCustomFlowMember.findByCustomFlow(cf);
		
		List<User> usersAlreadyAssociated = cfMembers.stream().map(x -> x.getMember()).collect(Collectors.toList());
		
		List<User> allUsers = new ArrayList<>();
		for(User u : this.repoUser.findAll()) {
			allUsers.add(u);
		}
		
		List<User> usersToAssociate = allUsers.stream().filter(
				x -> (this.userService.isAdmin(x)
				|| this.userService.isComandant(x)
				|| this.userService.isSecretar(x)) 
				&& !usersAlreadyAssociated.contains(x)).collect(Collectors.toList());
		return usersToAssociate;
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
