package ro.atm.management.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.dto.DtoUser;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoRole;
import ro.atm.management.repo.RepoUser;

@RestController
@RequestMapping("/test")
public class TestController {

	@Autowired
	private RepoUser repoUser;
	
	@Autowired
	private RepoRole repoRole;
	
	@GetMapping("/all")
	public List<DtoUser> getUsers(){
		List<DtoUser> dtos = new ArrayList<>();
		for(User u : repoUser.findAll()) {
			DtoUser dto = new DtoUser();
			dto.setPassowrd(u.getPassword());
			dto.setUsername(u.getEmail());
			dtos.add(dto);
		}
		return dtos;
	}
	
}
