package ro.atm.management.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.Role;

@Repository
public interface RepoRole extends CrudRepository<Role, Integer>{

	
	public Role findByRoleName(String roleName);
	public List<Role> findByRoleNameIn(List<String> roleNames);
}
