package ro.atm.management.dto;


//{
//"idCerere" : 3,
//"idSuperior" : 2,
//"motiv" : "Da, este okay",
//"status" : 1
//}
public class DtoFlow {

	private Integer idCerere;
	private Integer idSuperior;
	private String motiv;
	private Integer status;
	
	public Integer getIdCerere() {
		return idCerere;
	}
	public void setIdCerere(Integer idCerere) {
		this.idCerere = idCerere;
	}
	public Integer getIdSuperior() {
		return idSuperior;
	}
	public void setIdSuperior(Integer idSuperior) {
		this.idSuperior = idSuperior;
	}
	public String getMotiv() {
		return motiv;
	}
	public void setMotiv(String motiv) {
		this.motiv = motiv;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	
}
