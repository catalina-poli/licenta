package ro.atm.management.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.Anunt;

@Repository // clasa (interfata) care incarca date din db
public interface RepoAnunt extends CrudRepository<Anunt, Integer>{

}
