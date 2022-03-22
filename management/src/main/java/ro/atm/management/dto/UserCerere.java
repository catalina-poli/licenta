package ro.atm.management.dto;

public class UserCerere {
	private Integer id;
	private Integer canInterrupt;
	private Integer priority;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getCanInterrupt() {
		return canInterrupt;
	}

	public void setCanInterrupt(Integer canInterrupt) {
		this.canInterrupt = canInterrupt;
	}

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	@Override
	public String toString() {
		return "UserCerere [id=" + id + ", canInterrupt=" + canInterrupt + ", priority=" + priority + "]";
	}

	
}