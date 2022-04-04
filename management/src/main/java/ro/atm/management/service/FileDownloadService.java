package ro.atm.management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ro.atm.management.model.CerereDocument;
import ro.atm.management.repo.RepoCerereDocument;

@Service
public class FileDownloadService {

	@Autowired
	private RepoCerereDocument repoCerereDocument;

	public CerereDocument getCerereDocument(int id) {
		return this.repoCerereDocument.findById(id).get();
	}

	public ResponseEntity<Resource> getCerereDocumentAsResource(int id) {
		CerereDocument doc = this.getCerereDocument(id);
		Resource resource = new ByteArrayResource(doc.getContents());
		ResponseEntity<Resource> raspuns = ResponseEntity.ok().contentType(MediaType.parseMediaType(doc.getDocumentType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getFilename() + "\"")
				.body(resource);

		return raspuns;

	}

}
