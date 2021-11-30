package ro.atm.management.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.model.FlowCerere;
import ro.atm.management.repo.RepoFlowCerere;

@CrossOrigin(value = { "http://localhost:4200/" })
@RestController
@RequestMapping("/rest/flow") 
public class FlowController {

	@Autowired
	private RepoFlowCerere repoFlow;
	
	@GetMapping("/all")
	public Iterable<FlowCerere> all(){
		return repoFlow.findAll();
	}
	
	
	
}
