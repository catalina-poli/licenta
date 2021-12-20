package ro.atm.management.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.Group;

@Repository
public interface RepoGroup extends CrudRepository<Group, Integer>{

	
	
}
