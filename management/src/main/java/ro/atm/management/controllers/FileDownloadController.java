package ro.atm.management.controllers;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.service.FileDownloadService;

@RestController
@RequestMapping("/file-download")
public class FileDownloadController {

	private static final Logger logger = LoggerFactory.getLogger(FileDownloadController.class);

//	@Autowired
//	private FileStorageService fileStorageService;

	@Autowired
	private FileDownloadService fileDownloadService;

	@GetMapping("/cerere/{id}")
	public ResponseEntity<Resource> downloadFileCerere(@PathVariable("id") int id, HttpServletRequest request) {

		ResponseEntity<Resource> resource = this.fileDownloadService.getCerereDocumentAsResource(id);
		return resource;

	}
	
	@GetMapping("/cerere-sablon/{id}")
	public ResponseEntity<Resource> downloadFileSablon(@PathVariable("id") int id, HttpServletRequest request) {

		ResponseEntity<Resource> resource = this.fileDownloadService.getSablonDocumentAsResource(id);
		return resource;

	}

}