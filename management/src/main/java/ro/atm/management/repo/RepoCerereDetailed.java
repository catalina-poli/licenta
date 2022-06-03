package ro.atm.management.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.CerereDetailed;
import ro.atm.management.model.User;

@Repository
public interface RepoCerereDetailed extends PagingAndSortingRepository<CerereDetailed, Integer> {

	
	public Page<CerereDetailed> findAllByUserOrderByDateCreatedDesc(Pageable pageable, User user);
	public Page<CerereDetailed> findAllByOrderByDateCreatedDesc(Pageable pageable);
	public Page<CerereDetailed> findAllByTypeCerereAndUserOrderByDateCreatedDesc(Pageable pageable, String typeCerere,User user);
	public Page<CerereDetailed> findAllByTypeCerereOrderByDateCreatedDesc(Pageable pageable, String typeCerere);

	// archive
	public Page<CerereDetailed> findAllByArchivedOrderByDateCreatedDesc(Pageable pageable, Integer archived);
	public Page<CerereDetailed> findAllByUserAndArchivedOrderByDateCreatedDesc(Pageable pageable, User user, Integer archived);
	public Page<CerereDetailed> findAllByTypeCerereAndArchivedOrderByDateCreatedDesc(Pageable pageable, String typeCerere, Integer archived);
	public Page<CerereDetailed> findAllByTypeCerereAndUserAndArchivedOrderByDateCreatedDesc(Pageable pageable, String typeCerere,User user, Integer archived);
	
}
