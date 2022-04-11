package ro.atm.management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.itextpdf.text.Header;

import ro.atm.management.model.CategorieSablon;
import ro.atm.management.model.CerereDocument;
import ro.atm.management.repo.RepoCategorieSablon;
import ro.atm.management.repo.RepoCerereDocument;

@Service
public class FileDownloadService {

	@Autowired
	private RepoCerereDocument repoCerereDocument;

	@Autowired
	private RepoCategorieSablon repoCategorieSablon;
	
	public CerereDocument getCerereDocument(int id) {
		return this.repoCerereDocument.findById(id).get();
	}

	public CategorieSablon getSablonDocument(int id) {
		return this.repoCategorieSablon.findById(id).get();
	}
	
	public ResponseEntity<Resource> getCerereDocumentAsResource(int id) {
		CerereDocument doc = this.getCerereDocument(id);
		Resource resource = new ByteArrayResource(doc.getContents());
		ResponseEntity<Resource> raspuns = ResponseEntity.ok().contentType(MediaType.parseMediaType(doc.getDocumentType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getFilename() + "\"")
				.header("NumeFisier",  doc.getFilename())
				.header("Access-Control-Allow-Headers", "*")
				.header("Access-Control-Expose-Headers", "*")
				.body(resource);

		return raspuns;

	}
	
	public ResponseEntity<Resource> getSablonDocumentAsResource(int id) {
		CategorieSablon doc = this.getSablonDocument(id);
		Resource resource = new ByteArrayResource(doc.getFile());
		ResponseEntity<Resource> raspuns = ResponseEntity.ok().contentType(MediaType.parseMediaType(doc.getDocumentType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getFilename() + "\"")
				.header("NumeFisier",  doc.getFilename())
				.header("Access-Control-Allow-Headers", "*")
				.header("Access-Control-Expose-Headers", "*")
				.body(resource);

		return raspuns;

	}


}
