package ro.atm.management.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "flow_cereri")
public class FlowCerere {

	@Id // primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
	private Integer id;

	@ManyToOne
	@JoinColumn(name="id_cerere")
	private Cerere cerere;
	

	@ManyToOne
	@JoinColumn(name="id_user")
	private User superior;
	
	@Column(name="can_interrupt")
	private Integer canInterrupt;
	
	@Column(name="priority")
	private Integer priority;
	
	private Integer status;
	
	private String motiv;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	
	
	public Cerere getCerere() {
		return cerere;
	}

	public void setCerere(Cerere cerere) {
		this.cerere = cerere;
	}

	public User getSuperior() {
		return superior;
	}

	public void setSuperior(User superior) {
		this.superior = superior;
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
		return "FlowCerere [id=" + id + "]";
	}

}
