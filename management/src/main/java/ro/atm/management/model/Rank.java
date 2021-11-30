package ro.atm.management.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ranks")
public class Rank {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "rank_id")
	private Integer id;

	@Column(name = "rank_type")
	private String rankType;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getRankType() {
		return rankType;
	}

	public void setRankType(String rankType) {
		this.rankType = rankType;
	}
	
	
	
}
