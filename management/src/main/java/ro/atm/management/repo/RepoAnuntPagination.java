package ro.atm.management.repo;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.Anunt;

@Repository
public interface RepoAnuntPagination extends PagingAndSortingRepository<Anunt, Integer>{

}
