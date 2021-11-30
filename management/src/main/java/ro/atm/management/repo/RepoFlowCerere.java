package ro.atm.management.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.FlowCerere;

@Repository
public interface RepoFlowCerere extends CrudRepository<FlowCerere, Integer> {

}
