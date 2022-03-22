package ro.atm.management.dto;

import java.util.List;

import ro.atm.management.model.Cerere;

public class DtoCerereWithUsers {

	private Cerere cerere;
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

	@Override
	public String toString() {
		return "DtoCerereWithUsers [cerere=" + cerere + ", usersSelected=" + usersSelected + "]";
	}
	
	

}
