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
@Table(name="custom_flow_members")
public class CustomFlowMember {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
	private Integer id;
	
	
	@ManyToOne
	@JoinColumn(name="custom_flow_id")
	private CustomFlow customFlow;
	
	@ManyToOne
	@JoinColumn(name="member_id")
	private User member;
	
	@Column(name="order_index")
	private Integer orderIndex;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public CustomFlow getCustomFlow() {
		return customFlow;
	}

	public void setCustomFlow(CustomFlow customFlow) {
		this.customFlow = customFlow;
	}

	public User getMember() {
		return member;
	}

	public void setMember(User member) {
		this.member = member;
	}

	public Integer getOrderIndex() {
		return orderIndex;
	}

	public void setOrderIndex(Integer orderIndex) {
		this.orderIndex = orderIndex;
	}
	
	
	
	
}
