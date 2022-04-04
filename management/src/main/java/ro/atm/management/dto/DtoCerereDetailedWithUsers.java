package ro.atm.management.dto;

import java.util.List;

import ro.atm.management.model.CerereDetailed;

public class DtoCerereDetailedWithUsers {

	private CerereDetailed cerereDetailed;
	private List<UserCerere> usersSelected;

	

	public CerereDetailed getCerereDetailed() {
		return cerereDetailed;
	}

	public void setCerereDetailed(CerereDetailed cerereDetailed) {
		this.cerereDetailed = cerereDetailed;
	}

	public List<UserCerere> getUsersSelected() {
		return usersSelected;
	}

	public void setUsersSelected(List<UserCerere> usersSelected) {
		this.usersSelected = usersSelected;
	}

	@Override
	public String toString() {
		return "DtoCerereDetailedWithUsers [cerereDetailed=" + cerereDetailed + ", usersSelected=" + usersSelected
				+ "]";
	}

	

}
