package ro.atm.management.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.CerereDocument;

@Repository 
public interface RepoCerereDocument extends CrudRepository<CerereDocument, Integer>{

}
