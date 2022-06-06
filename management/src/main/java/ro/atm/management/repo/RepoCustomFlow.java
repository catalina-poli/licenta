package ro.atm.management.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.CustomFlow;
import ro.atm.management.model.User;

@Repository
public interface RepoCustomFlow extends CrudRepository<CustomFlow, Integer>{

	
	public List<CustomFlow> findByUserOwnerFlow(User user);
	
}
