package ro.atm.management.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	
	@GetMapping("/custom-flow-members/{customFlowId}")
	public List<User> findMembersForCustomFlow(@PathVariable("customFlowId") int customFlowId){
//		CustomFlow cf = this.repoCustomFlow.findById(customFlowId).get();
		List<CustomFlowMember> cfmembers = this.repoCustomFlowMember.findByCustomFlowId(customFlowId);
		Collections.sort(cfmembers, (x, y) -> x.getOrderIndex() - y.getOrderIndex());
		List<User> memberUsers = new ArrayList<>();
		for(CustomFlowMember cfmember : cfmembers) {
			memberUsers.add(cfmember.getMember());
		}
		return memberUsers;
	}
	
	@PutMapping("/edit-custom-flow-member-order/{customFlowId}")
	public CustomFlow editCustomFlow(@RequestBody List<Integer> userIds, @PathVariable("customFlowId") int customFlowId) {
		CustomFlow cf = this.repoCustomFlow.findById(customFlowId).get();
		List<CustomFlowMember> members = this.repoCustomFlowMember.findByCustomFlow(cf);
		for(CustomFlowMember cfm : members) {
			cfm.setOrderIndex(userIds.indexOf(cfm.getMember().getId()));
			this.repoCustomFlowMember.save(cfm);
		}
		return cf;
	}
	
	@PostMapping("/save-flow")
	public ResponseEntity<CustomFlow> saveFlow(@RequestBody DtoSaveCustomFlow dto, Principal principal) {
		User owner = this.userService.getUser(principal).get();
		CustomFlow customFlow = dto.getCustomFlow();
		List<User> members = dto.getCustomFlowMembers();
		if(members.size() == 0 || customFlow.getCustomFlowName() == null || customFlow.getCustomFlowName().isEmpty()) {
			return ResponseEntity.badRequest().build();
		}
		customFlow.setUserOwnerFlow(owner);
		CustomFlow customFlowSaved = this.repoCustomFlow.save(customFlow);
		int index = 0;
		for(User member: members) {
			CustomFlowMember cfm = new CustomFlowMember();
			cfm.setCustomFlow(customFlowSaved);
			cfm.setMember(member);
			cfm.setOrderIndex(index);
			this.repoCustomFlowMember.save(cfm);
			index++;
		}
		return ResponseEntity.ok(customFlowSaved);
	}
}
