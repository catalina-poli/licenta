package ro.atm.management.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.Group;
import ro.atm.management.model.User;

@Repository
public interface RepoGroup extends CrudRepository<Group, Integer>{

	public List<Group> findAllByStudents(User userStudent);
	
}
