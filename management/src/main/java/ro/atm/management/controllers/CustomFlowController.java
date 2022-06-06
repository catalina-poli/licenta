package ro.atm.management.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.dto.DtoSaveCustomFlow;
import ro.atm.management.model.CustomFlow;
import ro.atm.management.model.CustomFlowMember;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoCustomFlow;
import ro.atm.management.repo.RepoCustomFlowMember;
import ro.atm.management.service.UserService;

@RestController
@RequestMapping("/rest/custom-flow")
public class CustomFlowController {

	
	@Autowired
	private RepoCustomFlow repoCustomFlow;
	@Autowired
	private RepoCustomFlowMember repoCustomFlowMember;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/my-custom-flows")
	public List<CustomFlow> findMyCustomFlow(Principal principal){
		
		return this.repoCustomFlow.findByUserOwnerFlow(this.userService.getUser(principal).get());
	}
	
	
	@PostMapping("/save-flow")
	public CustomFlow saveFlow(@RequestBody DtoSaveCustomFlow dto, Principal principal) {
		User owner = this.userService.getUser(principal).get();
		CustomFlow customFlow = dto.getCustomFlow();
		List<User> members = dto.getCustomFlowMembers();
		customFlow.setUserOwnerFlow(owner);
		CustomFlow customFlowSaved = this.repoCustomFlow.save(customFlow);
		for(User member: members) {
			CustomFlowMember cfm = new CustomFlowMember();
			cfm.setCustomFlow(customFlowSaved);
			cfm.setMember(member);
			this.repoCustomFlowMember.save(cfm);
		}
		return customFlowSaved;
	}
}
