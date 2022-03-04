package ro.atm.management.dto;

public class DtoFlowUpdateStatus {
 
	private Integer idFlowItem;
	private Integer statusItem;
	private String motiv;
	
	public Integer getIdFlowItem() {
		return idFlowItem;
	}
	public void setIdFlowItem(Integer idFlowItem) {
		this.idFlowItem = idFlowItem;
	}
	public Integer getStatusItem() {
		return statusItem;
	}
	public void setStatusItem(Integer statusItem) {
		this.statusItem = statusItem;
	}
	public String getMotiv() {
		return motiv;
	}
	public void setMotiv(String motiv) {
		this.motiv = motiv;
	}
	@Override
	public String toString() {
		return "DtoFlowUpdateStatus [idFlowItem=" + idFlowItem + ", statusItem=" + statusItem + ", motiv=" + motiv
				+ "]";
	}
	
	
	
	
}
