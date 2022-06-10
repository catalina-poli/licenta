package ro.atm.management.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.CustomFlow;
import ro.atm.management.model.CustomFlowMember;

@Repository
public interface RepoCustomFlowMember extends CrudRepository<CustomFlowMember, Integer>{

	
	public List<CustomFlowMember> findByCustomFlowId(int customFlowId);
	public List<CustomFlowMember> findByCustomFlow(CustomFlow customFlow);
	
}
