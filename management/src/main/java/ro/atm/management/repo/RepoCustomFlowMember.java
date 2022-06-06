package ro.atm.management.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.CustomFlow;
import ro.atm.management.model.CustomFlowMember;

@Repository
public interface RepoCustomFlowMember extends CrudRepository<CustomFlowMember, Integer>{

}
