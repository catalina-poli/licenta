package ro.atm.management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.atm.data.es.model.CerereESModel;
import ro.atm.data.es.repository.CerereESRepository;
import ro.atm.management.model.Cerere;
import ro.atm.management.model.CerereDetailed;

@Service
public class ESCerereService {

	@Autowired
	private CerereESRepository cerereESRepository;
	
	public CerereESModel saveCerere(Cerere cerereDocument) {
		// TODO: implement later
		throw new UnsupportedOperationException();
	}
	
	public CerereESModel saveCerere(CerereDetailed cerereDetailed) {
		CerereESModel model = new CerereESModel();
		model.setDocumentOrDetailed("CERERE_DETAILED");
		model.setMotiv(cerereDetailed.getMotiv());
		model.setJudet(cerereDetailed.getJudet());
		model.setLocalitate(cerereDetailed.getLocalitate());
		model.setUserEmail(cerereDetailed.getUser().getEmail());
		model.setIdCerereSalvataDocumentOrDetailed(""+ cerereDetailed.getId());
		
		return this.cerereESRepository.save(model);
	}
	
}
