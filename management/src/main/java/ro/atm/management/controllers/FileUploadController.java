package ro.atm.management.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import ro.atm.management.dto.Response;
import ro.atm.management.model.Anunt;
import ro.atm.management.model.CategorieSablon;
import ro.atm.management.service.FileStorageService;

@RestController
public class FileUploadController {

	@Autowired
	private FileStorageService fileStorageService;

	@PostMapping("/uploadFile-sablon/{nodeName}/{idParent}")
	public CategorieSablon uploadFileSablon(@RequestParam("file") MultipartFile file,
			@PathVariable("nodeName") String nodeName, @PathVariable("idParent") int idParent) {
		CategorieSablon categorieSablonSaved = fileStorageService.storeFileSablon(file, nodeName, idParent);

		return categorieSablonSaved;
	}

	@PostMapping("/uploadFile-anunt/{title}")
	public Anunt uploadFileAnunt(@RequestParam("file") MultipartFile file, @PathVariable("title") String title) {
		System.out.println("**SAVING ANUNT**");
		Anunt anuntSaved = fileStorageService.storeFileAnunt(file, title);

		return anuntSaved;
	}

	
	
	@PostMapping("/uploadFile/{idCerere}")
	public Response uploadFile(@RequestParam("file") MultipartFile file,
			@PathVariable("idCerere") int idCerere) {
		String fileName = fileStorageService.storeFile(file, "cerere", idCerere);
		// TODO: remove hardcoding ^
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(fileName).toUriString();

		return new Response(fileName, fileDownloadUri, file.getContentType(), file.getSize());
	}
//
//	@PostMapping("/uploadMultipleFiles")
//	public List<Response> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
//		return Arrays.asList(files).stream().map(file -> uploadFile(file)).collect(Collectors.toList());
//	}
}