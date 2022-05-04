package ro.atm.management.dto;

import java.util.List;

import ro.atm.management.model.Cerere;
import ro.atm.management.model.CerereDetailed;

public class DtoCerereWithUsers {

	private Cerere cerere;
	private CerereDetailed cerereDetailed;
	private List<UserCerere> usersSelected;

	public Cerere getCerere() {
		return cerere;
	}

	public void setCerere(Cerere cerere) {
		this.cerere = cerere;
	}

	public List<UserCerere> getUsersSelected() {
		return usersSelected;
	}

	public void setUsersSelected(List<UserCerere> usersSelected) {
		this.usersSelected = usersSelected;
	}

	
	
	public CerereDetailed getCerereDetailed() {
		return cerereDetailed;
	}

	public void setCerereDetailed(CerereDetailed cerereDetailed) {
		this.cerereDetailed = cerereDetailed;
	}

	@Override
	public String toString() {
		return "DtoCerereWithUsers [cerere=" + cerere + ", usersSelected=" + usersSelected + "]";
	}
	
	

}
