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
@Table(name="custom_flow")
public class CustomFlow {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
	private Integer id;
	
	
	@Column(name="custom_flow_name")
	private String customFlowName;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User userOwnerFlow;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCustomFlowName() {
		return customFlowName;
	}

	public void setCustomFlowName(String customFlowName) {
		this.customFlowName = customFlowName;
	}

	public User getUserOwnerFlow() {
		return userOwnerFlow;
	}

	public void setUserOwnerFlow(User userOwnerFlow) {
		this.userOwnerFlow = userOwnerFlow;
	}
	
	
	
	
	
}
