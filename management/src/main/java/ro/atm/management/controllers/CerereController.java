package ro.atm.management.controllers;

import java.security.Principal;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.model.Cerere;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoCerere;
import ro.atm.management.repo.RepoUser;

@CrossOrigin(value = {"http://localhost:4200/"})
@RestController
@RequestMapping("/rest/cerere")
public class CerereController {

	@Autowired
	private RepoCerere repoCerere;
	
	@Autowired
	private RepoUser repoUser;
	
	@GetMapping("/all")
	public Iterable<Cerere> allCereri(){
		return repoCerere.findAll();
	}
	
	@GetMapping("/by-id/{idCerere}")
	public Cerere getCerereDupaId(@PathVariable("idCerere") int id) {
		return repoCerere.findById(id).get();
	}
	
	@GetMapping("/by-user/{idUser}")
	public List<Cerere> getDupaUser(@PathVariable("idUser")int idUser){
		
		User userAsociat = repoUser.findById(idUser).get();  // SELECT * FROM users where id = <idUser>;
		return this.repoCerere.findByUserAssociated(userAsociat);
		
//		List<Cerere> cereri = new ArrayList<>();
//		for(Cerere c : this.repoCerere.findAll()) { // SELECT * FROM cereri ----> SELECT * FROM cereri where id_user = .//
//			if(c.getUserAssociated().getId() == idUser) {
//				cereri.add(c);
//			}
//		}
//		return cereri;
	}
	
	@GetMapping("/all-restanta")
	public List<Cerere> getRestante(){
		return this.repoCerere.findByTypeCerere("restanta");
	}
	
	@PostMapping("/save")
	public Cerere saveCerere(@RequestBody Cerere cerereNoua, Principal principal) {
		System.out.println("PRINCIPAL: " + principal.getName());
		User userLogat = this.repoUser.findByEmail(principal.getName()).get();
		cerereNoua.setUserAssociated(userLogat);
		cerereNoua.setDateCreated(new Date());
		return this.repoCerere.save(cerereNoua);
	}
}
