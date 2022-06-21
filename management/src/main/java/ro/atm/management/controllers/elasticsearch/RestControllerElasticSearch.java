package ro.atm.management.controllers.elasticsearch;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.data.es.model.CerereESModel;
import ro.atm.data.es.repository.CerereESRepository;

@RestController
@RequestMapping("/es")
public class RestControllerElasticSearch {

	@Autowired
	private CerereESRepository cerereESRepository;

	@GetMapping("/cereri/all")
	public Iterable<CerereESModel> findAllCereriES() {

		return cerereESRepository.findAll();
	}

	@GetMapping("/cereri-pagination/{page}/{size}/{sort}/{order}")
	public Page<CerereESModel> getCereriArchivedPaginated(@PathVariable("page") int page,
			@PathVariable("size") int size, @PathVariable("sort") String sort, @PathVariable("order") String order) {
		Pageable pageCurrent = PageRequest.of(page, size,
				order.equals("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending());
		return this.cerereESRepository.findAll(pageCurrent);
	}

	@GetMapping("/cereri/search-by/{categorySearch}/{cuvantCautat}/{page}/{size}/{sort}/{order}")
	public Page<CerereESModel> searchCriteriuAndCuvantCautat(@PathVariable("cuvantCautat") String cuvantCautat,
			@PathVariable("categorySearch") String categorySearch, @PathVariable("page") int page,
			@PathVariable("size") int size, @PathVariable("sort") String sort, @PathVariable("order") String order) {

		Pageable pageCurrent = PageRequest.of(page, size,
				order.equals("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending());
		Page<CerereESModel> result = null;
		if (categorySearch.equals("motiv")) {
			result = cerereESRepository.searchCustomQueryMotiv(cuvantCautat, pageCurrent);
		} else if (categorySearch.equals("email")) {
			result = cerereESRepository.searchCustomQueryEmail(cuvantCautat, pageCurrent);
		} else if (categorySearch.equals("judet")) {
			result = cerereESRepository.searchCustomQueryJudet(cuvantCautat, pageCurrent);
		}

		return result;
	}

}
