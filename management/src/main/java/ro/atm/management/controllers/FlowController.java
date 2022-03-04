package ro.atm.management.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.dto.DtoFlow;
import ro.atm.management.dto.DtoFlowUpdateStatus;
import ro.atm.management.model.Cerere;
import ro.atm.management.model.FlowCerere;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoCerere;
import ro.atm.management.repo.RepoFlowCerere;
import ro.atm.management.repo.RepoUser;

@CrossOrigin(value = { "http://localhost:4200/" })
@RestController
@RequestMapping("/rest/flow") 
public class FlowController {

	@Autowired
	private RepoFlowCerere repoFlow;
	
	@Autowired
	private RepoCerere repoCerere;
	
	@Autowired
	private RepoUser repoUser;
	
	@GetMapping("/all")
	public Iterable<FlowCerere> all(){
		return repoFlow.findAll();
	}
	
	@GetMapping("/by-cerere-id/{id}")
	public List<FlowCerere> findByCerereId(@PathVariable("id") int id){
		Cerere cerere = repoCerere.findById(id).get();
		return repoFlow.findByCerere(cerere);
	}
	
//	{
//	    "idCerere" : 3,
//	    "idSuperior" : 2,
//	    "motiv" : "Da, este okay",
//	    "status" : 1
//	}
	
	@PostMapping("/save")
	public FlowCerere save(@RequestBody DtoFlow dtoFlow) {
		
		// TODO: checks and validations
		FlowCerere flow = new FlowCerere();
		flow.setCerere(repoCerere.findById(dtoFlow.getIdCerere()).get());
		flow.setSuperior(repoUser.findById(dtoFlow.getIdSuperior()).get());
		flow.setMotiv(dtoFlow.getMotiv());
		flow.setStatus(dtoFlow.getStatus());
		return repoFlow.save(flow);
	}
	
	@PutMapping("/update-status")
	public FlowCerere modifyStatus(@RequestBody DtoFlowUpdateStatus dto, Principal principal) {
		System.out.println("DtO: " + dto);
		User userLoggedIn = this.repoUser.findByEmail(principal.getName()).get();
		FlowCerere flowItem = this.repoFlow.findById(dto.getIdFlowItem()).get();
		flowItem.setStatus(dto.getStatusItem());
		flowItem.setMotiv(dto.getMotiv());
		// the user modifying the flow item should be the valid user that has access to modify the item
		if(!userLoggedIn.getId().equals(flowItem.getSuperior().getId())) {
			throw new RuntimeException("Security issue - invalid user");
		}

		return this.repoFlow.save(flowItem);
	}
	
}
