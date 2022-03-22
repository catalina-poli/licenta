package ro.atm.management.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.Role;
import ro.atm.management.model.User;

@Repository
public interface RepoUser extends CrudRepository<User, Integer>{

	
	public Optional<User> findByEmail(String email);
	public List<User> findByUserType(String userType);
	public List<User> findByUserRolesIn(Iterable<Role> userRoles);
}
