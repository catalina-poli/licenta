package ro.atm.management.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.CerereType;

@Repository
public interface RepoCerereType extends CrudRepository<CerereType, Integer>{

	public CerereType findByTypeCerere(String typeCerere);
	
}
