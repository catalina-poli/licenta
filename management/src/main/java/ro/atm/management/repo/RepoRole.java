package ro.atm.management.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.Role;

@Repository
public interface RepoRole extends CrudRepository<Role, Integer>{

}
