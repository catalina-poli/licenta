package ro.atm.management.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.model.Group;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoGroup;
import ro.atm.management.repo.RepoUser;

@RestController
@RequestMapping("/rest/groups")
public class GroupsController {


	@Autowired
	private RepoGroup repoGroup;
	
	@Autowired
	private RepoUser repoUser;
	
	
	@GetMapping("/all")
	public Iterable<Group> findAll(){
		return this.repoGroup.findAll();
	}
	
	@DeleteMapping("/remove-user/{idUser}/{idGroup}")
	public Group removeUserFromGroup(@PathVariable("idUser") int idUser, @PathVariable("idGroup") int idGroup) {
		User user = repoUser.findById(idUser).get();
		Group group = repoGroup.findById(idGroup).get();
		
		group.getStudents().remove(user);
		repoGroup.save(group);
		return group;
	}
	
	@PostMapping("/add-user/{idUser}/{idGroup}")
	public Group addUserToGroup(@PathVariable("idUser") int idUser, @PathVariable("idGroup") int idGroup) {
		User user = repoUser.findById(idUser).get();
		Group group = repoGroup.findById(idGroup).get();
		group.getStudents().add(user);
		repoGroup.save(group);
		return group;
	}
	
}
