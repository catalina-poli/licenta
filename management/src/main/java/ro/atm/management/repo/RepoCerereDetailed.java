package ro.atm.management.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.CerereDetailed;

@Repository
public interface RepoCerereDetailed extends CrudRepository<CerereDetailed, Integer> {

}
