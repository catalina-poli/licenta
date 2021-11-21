package ro.atm.management.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.Cerere;
import ro.atm.management.model.User;

@Repository
public interface RepoCerere extends CrudRepository<Cerere, Integer> {

	public List<Cerere> findByUserAssociated(User userAssociated);
	public List<Cerere> findByTypeCerere(String typeCerere);

}
