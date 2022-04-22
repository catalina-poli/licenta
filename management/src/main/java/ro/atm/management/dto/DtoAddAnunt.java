package ro.atm.management.dto;

import java.util.List;

import ro.atm.management.model.Anunt;

public class DtoAddAnunt {

	private Anunt anunt;
	private List<Integer> userIds;
	public Anunt getAnunt() {
		return anunt;
	}
	public void setAnunt(Anunt anunt) {
		this.anunt = anunt;
	}
	public List<Integer> getUserIds() {
		return userIds;
	}
	public void setUserIds(List<Integer> userIds) {
		this.userIds = userIds;
	}
	
	
}
