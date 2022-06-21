package ro.atm.data.es.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import ro.atm.data.es.model.CerereESModel;

@Repository
public interface CerereESRepository extends ElasticsearchRepository<CerereESModel, String> {

	Page<CerereESModel> findByMotiv(String motiv, Pageable pageable);

	Page<CerereESModel> findByTypeCerere(String typeCerere, Pageable pageable);

	// cereri
	@Query("{\"bool\": {\"must\": [{\"match\": {\"motiv\": \"?0\"}}]}}")
	Page<CerereESModel> searchCustomQueryMotiv(String motiv, Pageable pageable);
	
	@Query("{\"bool\": {\"must\": [{\"match\": {\"userEmail\": \"?0\"}}]}}")
	Page<CerereESModel> searchCustomQueryEmail(String email, Pageable pageable);
	
	@Query("{\"bool\": {\"must\": [{\"match\": {\"judet\": \"?0\"}}]}}")
	Page<CerereESModel> searchCustomQueryJudet(String judet, Pageable pageable);

//    Page<Article> findByAuthorsName(String name, Pageable pageable);
//
//    @Query("{\"bool\": {\"must\": [{\"match\": {\"authors.name\": \"?0\"}}]}}")
//    Page<Article> findByAuthorsNameUsingCustomQuery(String name, Pageable pageable);
//
//    @Query("{\"bool\": {\"must\": {\"match_all\": {}}, \"filter\": {\"term\": {\"tags\": \"?0\" }}}}")
//    Page<Article> findByFilteredTagQuery(String tag, Pageable pageable);
//
//    @Query("{\"bool\": {\"must\": {\"match\": {\"authors.name\": \"?0\"}}, \"filter\": {\"term\": {\"tags\": \"?1\" }}}}")
//    Page<Article> findByAuthorsNameAndFilteredTagQuery(String name, String tag, Pageable pageable);
}