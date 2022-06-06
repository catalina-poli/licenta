package ro.atm.management.dto;

import java.util.List;

import ro.atm.management.model.CustomFlow;
import ro.atm.management.model.User;

public class DtoSaveCustomFlow {

	private CustomFlow customFlow;
	private List<User> customFlowMembers;
	public CustomFlow getCustomFlow() {
		return customFlow;
	}
	public void setCustomFlow(CustomFlow customFlow) {
		this.customFlow = customFlow;
	}
	public List<User> getCustomFlowMembers() {
		return customFlowMembers;
	}
	public void setCustomFlowMembers(List<User> customFlowMembers) {
		this.customFlowMembers = customFlowMembers;
	}
	
	
	
	
	
}
