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

	@GetMapping("/cereri/search-by/{cuvantCautat}/{page}/{size}/{sort}/{order}")
	public Page<CerereESModel> searchCriteriuAndCuvantCautat(@PathVariable("cuvantCautat") String cuvantCautat,
			@PathVariable("page") int page, @PathVariable("size") int size, @PathVariable("sort") String sort,
			@PathVariable("order") String order) {

		Pageable pageCurrent = PageRequest.of(page, size,
				order.equals("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending());
		return cerereESRepository.searchCustomQuery(cuvantCautat, pageCurrent);

	}

}
