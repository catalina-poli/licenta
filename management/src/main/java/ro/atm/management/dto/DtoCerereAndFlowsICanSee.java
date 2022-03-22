package ro.atm.management.dto;

import java.util.List;

import ro.atm.management.model.Cerere;
import ro.atm.management.model.FlowCerere;

public class DtoCerereAndFlowsICanSee {

	private Cerere cerere;
	private List<FlowCerere> flowItemsICanSeeForCerere;
	public List<FlowCerere> getFlowItemsICanSeeForCerere() {
		return flowItemsICanSeeForCerere;
	}
	public void setFlowItemsICanSeeForCerere(List<FlowCerere> flowItemsICanSeeForCerere) {
		this.flowItemsICanSeeForCerere = flowItemsICanSeeForCerere;
	}
	public Cerere getCerere() {
		return cerere;
	}
	public void setCerere(Cerere cerere) {
		this.cerere = cerere;
	}
	
}
