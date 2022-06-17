package ro.atm.management.controllers.elasticsearch;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	@GetMapping("/cereri/search-by/{criteriu}/{cuvantCautat}")
	public List<CerereESModel> searchCriteriuAndCuvantCautat(@PathVariable("criteriu") String criteriu, @PathVariable("cuvantCautat") String cuvantCautat){
		if(criteriu.equals("MOTIV")) {
			return cerereESRepository.findByMotivCustomQuery(cuvantCautat);
		}
		List<CerereESModel> result = new ArrayList<>();
		return result;
	}
	
	
}
