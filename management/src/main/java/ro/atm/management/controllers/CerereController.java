package ro.atm.management.controllers;

import java.security.Principal;
import java.util.ArrayList;
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
import ro.atm.management.model.CerereType;
import ro.atm.management.model.FlowCerere;
import ro.atm.management.model.Group;
import ro.atm.management.model.Role;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoCerere;
import ro.atm.management.repo.RepoCerereType;
import ro.atm.management.repo.RepoFlowCerere;
import ro.atm.management.repo.RepoGroup;
import ro.atm.management.repo.RepoUser;

@CrossOrigin(value = {"http://localhost:4200/"})
@RestController
@RequestMapping("/rest/cerere")
public class CerereController {

	@Autowired
	private RepoCerere repoCerere;
	
	@Autowired
	private RepoUser repoUser;
	
	@Autowired
	private RepoGroup repoGroup;
	
	@Autowired
	private RepoFlowCerere repoFlow;
	
	@Autowired
	private RepoCerereType repoCerereType;
	
	@GetMapping("/all")
	public List<Cerere> allCereri(Principal principal){
		User userLogat = this.repoUser.findByEmail(principal.getName()).get();
		boolean admin = false;
		for(Role role : userLogat.getUserRoles()) {
			if(role.getRoleName().equals("ADMIN")) {
				admin = true;
				break;
			}
		}
		if(admin) {
			return repoCerere.findAllByOrderByDateCreatedDesc();
		}
		return repoCerere.findAllByUserAssociatedOrderByDateCreatedDesc(userLogat);
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
	
	
	private void saveCerereFlowForCerereAndUserStatus2Pending(Cerere cerereSalvata, User userInCharge) {
		FlowCerere flow = new FlowCerere();
		flow.setCerere(cerereSalvata);
		flow.setMotiv(null);
		flow.setStatus(2); // 2 - INCOMPLETE / PENDING
		flow.setSuperior(userInCharge);
		this.repoFlow.save(flow);
		
	}
	
	@PostMapping("/save")
	public Cerere saveCerere(@RequestBody Cerere cerereNoua, Principal principal) {
		System.out.println("PRINCIPAL: " + principal.getName());
		User userLogat = this.repoUser.findByEmail(principal.getName()).get();
		cerereNoua.setUserAssociated(userLogat);
		cerereNoua.setDateCreated(new Date());
		
		CerereType cerereType = this.repoCerereType.findByTypeCerere(cerereNoua.getTypeCerere());
		cerereNoua.setCerereType(cerereType);
		
		
		Cerere cerereSalvata = this.repoCerere.save(cerereNoua);
		// cand o noua cerere este inregistrata, in flow vor fi salvate cererile de aprobare a cerii, 
		//		urmand ca acestea sa fie aprobate ulterior
		List<Group> groupsCerere = this.getGroupsForCerere(cerereNoua.getId());
		for(Group g : groupsCerere) {
			User userInCharge = g.getUserInCharge();
			if(userInCharge!= null) {
				this.saveCerereFlowForCerereAndUserStatus2Pending(cerereSalvata, userInCharge);
			}
			if(g.getParentGroup() != null) {
				if(g.getParentGroup().getUserInCharge() != null) {
					this.saveCerereFlowForCerereAndUserStatus2Pending(cerereSalvata, g.getParentGroup().getUserInCharge());
				}
			}
			
		}
		return cerereSalvata;
	}
	
	@GetMapping("/flow/accept-refuse/by-me")
	public List<FlowCerere>myFlowCereri(Principal principal){
		System.out.println("PRINCIPAL: " + principal.getName());
		User userLogat = this.repoUser.findByEmail(principal.getName()).get();
		List<FlowCerere> myFlowItems = this.repoFlow.findBySuperior(userLogat);
		return myFlowItems;
	}
	
	@GetMapping("/get-groups-for-cerere/{idCerere}")
	public List<Group> getGroupsForCerere(@PathVariable("idCerere")int idCerere){
		List<Group> rezultat = new ArrayList<>();
		Cerere cerere = this.repoCerere.findById(idCerere).get();
		System.out.println("CERERE GASITA: " + cerere);
		User userAsociat = cerere.getUserAssociated();
		System.out.println("USER ASOCIAT: " + userAsociat);
		Iterable<Group> allGroups = this.repoGroup.findAll();
		for(Group g : allGroups) {
			System.out.println("\t\tSTUDENTI IN GRUP: " + g.getStudents());
			if(g.getStudents().contains(userAsociat)) {
				rezultat.add(g);
			}
		}
//		rezultat = this.repoGroup.findAllByStudents(userAsociat);
		return rezultat;
	}
	
}
