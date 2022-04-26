package ro.atm.management.dto;

import java.util.List;

import ro.atm.management.model.Anunt;

public class DtoAddAnunt {

	private Anunt anunt;
	private List<Integer> ids;
	public Anunt getAnunt() {
		return anunt;
	}
	public void setAnunt(Anunt anunt) {
		this.anunt = anunt;
	}
	public List<Integer> getIds() {
		return ids;
	}
	public void setIds(List<Integer> ids) {
		this.ids = ids;
	}
	
	
	
}
