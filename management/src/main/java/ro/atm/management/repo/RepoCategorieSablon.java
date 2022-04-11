package ro.atm.management.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ro.atm.management.model.CategorieSablon;

@Repository 
public interface RepoCategorieSablon extends CrudRepository<CategorieSablon, Integer>{

	public List<CategorieSablon> findAllByCategorieParinteIsNull();
	public List<CategorieSablon> findByCategorieParinteId(int idParent);
	
}
