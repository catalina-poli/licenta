package ro.atm.management.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.Cerere;
import ro.atm.management.model.User;

@Repository
public interface RepoCerere extends PagingAndSortingRepository<Cerere, Integer> {

	public List<Cerere> findByUserAssociated(User userAssociated);
	public List<Cerere> findByTypeCerere(String typeCerere);
	public List<Cerere> findAllByOrderByDateCreatedDesc();
	public List<Cerere> findAllByUserAssociatedOrderByDateCreatedDesc(User userAssociated);
	
	public Page<Cerere> findAllByUserAssociatedOrderByDateCreatedDesc(Pageable pageable, User userAssociated);
	public Page<Cerere> findAllByOrderByDateCreatedDesc(Pageable pageable);
	public Page<Cerere> findAllByTypeCerereAndUserAssociatedOrderByDateCreatedDesc(Pageable pageable, String typeCerere,User userAssociated);
	public Page<Cerere> findAllByTypeCerereOrderByDateCreatedDesc(Pageable pageable, String typeCerere);

	
	// archived
	public Page<Cerere> findAllByUserAssociatedAndArchivedOrderByDateCreatedDesc(Pageable pageable, User userAssociated, Integer archived);
	public Page<Cerere> findAllByArchivedOrderByDateCreatedDesc(Pageable pageable, Integer archived);
	public Page<Cerere> findAllByTypeCerereAndUserAssociatedAndArchivedOrderByDateCreatedDesc(Pageable pageable, String typeCerere,User userAssociated, Integer archived);
	public Page<Cerere> findAllByTypeCerereAndArchivedOrderByDateCreatedDesc(Pageable pageable, String typeCerere, Integer archived);

}
